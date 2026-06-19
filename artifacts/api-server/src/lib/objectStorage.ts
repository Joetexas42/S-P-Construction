import {
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from "stream";
import { randomUUID } from "crypto";
import {
  type R2ObjectRef,
  ObjectAclPolicy,
  ObjectPermission,
  canAccessObject,
  getObjectAclPolicy,
  setObjectAclPolicy,
} from "./objectAcl";
import { getR2Client, getR2BucketName } from "./r2Client";

export { ObjectNotFoundError };

class ObjectNotFoundError extends Error {
  constructor() {
    super("Object not found");
    this.name = "ObjectNotFoundError";
    Object.setPrototypeOf(this, ObjectNotFoundError.prototype);
  }
}

// ---------------------------------------------------------------------------
// Path helpers
// ---------------------------------------------------------------------------

/**
 * Parse a "virtual path" of the form "/<bucket>/<key>" into its parts.
 * This mirrors the GCS path convention used by PUBLIC_OBJECT_SEARCH_PATHS
 * and PRIVATE_OBJECT_DIR so those env vars stay compatible.
 */
function parseObjectPath(path: string): { bucketName: string; objectName: string } {
  if (!path.startsWith("/")) path = `/${path}`;
  const parts = path.split("/");
  if (parts.length < 3) throw new Error("Invalid path: must contain at least a bucket name");
  return { bucketName: parts[1]!, objectName: parts.slice(2).join("/") };
}

// ---------------------------------------------------------------------------
// ObjectStorageService
// ---------------------------------------------------------------------------

export class ObjectStorageService {
  getPublicObjectSearchPaths(): Array<string> {
    const pathsStr = process.env["PUBLIC_OBJECT_SEARCH_PATHS"] ?? "";
    const paths = Array.from(
      new Set(
        pathsStr
          .split(",")
          .map((p) => p.trim())
          .filter((p) => p.length > 0),
      ),
    );
    if (paths.length === 0) {
      throw new Error(
        "PUBLIC_OBJECT_SEARCH_PATHS not set. Set it to comma-separated paths " +
          "in the form /<bucket>/<prefix> (e.g. /my-bucket/public).",
      );
    }
    return paths;
  }

  getPrivateObjectDir(): string {
    const dir = process.env["PRIVATE_OBJECT_DIR"] ?? "";
    if (!dir) {
      throw new Error(
        "PRIVATE_OBJECT_DIR not set. Set it to a path in the form /<bucket>/<prefix> " +
          "(e.g. /my-bucket/uploads).",
      );
    }
    return dir;
  }

  /**
   * Search for a file across all PUBLIC_OBJECT_SEARCH_PATHS.
   * Returns the first matching R2ObjectRef, or null if not found.
   */
  async searchPublicObject(filePath: string): Promise<R2ObjectRef | null> {
    const client = getR2Client();
    for (const searchPath of this.getPublicObjectSearchPaths()) {
      const fullPath = `${searchPath}/${filePath}`;
      const { bucketName, objectName } = parseObjectPath(fullPath);
      try {
        await client.send(
          new HeadObjectCommand({ Bucket: bucketName, Key: objectName }),
        );
        return { bucket: bucketName, key: objectName };
      } catch (err: unknown) {
        const name = (err as { name?: string }).name;
        if (name === "NotFound" || name === "NoSuchKey") continue;
        throw err;
      }
    }
    return null;
  }

  /**
   * Stream an R2 object as a web Response.
   * Reads the ACL policy from object metadata to set the Cache-Control header.
   */
  async downloadObject(
    objectRef: R2ObjectRef,
    cacheTtlSec = 3600,
  ): Promise<Response> {
    const client = getR2Client();
    const result = await client.send(
      new GetObjectCommand({ Bucket: objectRef.bucket, Key: objectRef.key }),
    );

    const body = result.Body;
    if (!body) throw new Error("GetObject returned an empty body");

    const aclPolicyRaw = result.Metadata?.["acl-policy"];
    let isPublic = false;
    if (aclPolicyRaw) {
      try {
        const policy = JSON.parse(aclPolicyRaw) as ObjectAclPolicy;
        isPublic = policy.visibility === "public";
      } catch {
        /* ignore malformed metadata */
      }
    }

    const headers: Record<string, string> = {
      "Content-Type": result.ContentType ?? "application/octet-stream",
      "Cache-Control": `${isPublic ? "public" : "private"}, max-age=${cacheTtlSec}`,
    };
    if (result.ContentLength != null) {
      headers["Content-Length"] = String(result.ContentLength);
    }

    // AWS SDK returns a Node.js Readable in Node environments.
    const nodeStream = body as unknown as Readable;
    const webStream = Readable.toWeb(nodeStream) as ReadableStream;

    return new Response(webStream, { headers });
  }

  /**
   * Generate a presigned PUT URL so a client can upload directly to R2.
   * Returns both the presigned upload URL and the canonical objectPath
   * ("/objects/<key>") that should be stored and used with the serve route.
   *
   * The objectPath is derived deterministically from the generated key —
   * never by parsing the presigned URL — because AWS SDK v3 may emit
   * virtual-hosted-style URLs whose pathname does not contain the bucket name.
   */
  async getObjectEntityUploadURL(): Promise<{ uploadURL: string; objectPath: string }> {
    const privateObjectDir = this.getPrivateObjectDir();
    const objectId = randomUUID();

    // fullPath = /<bucket>/<prefix>/<uuid>
    // The configured PRIVATE_OBJECT_DIR already provides the upload prefix
    // (e.g. ".../uploads"), so we must NOT append another "/uploads" segment —
    // doing so produced doubled keys like "uploads/uploads/<uuid>".
    const fullPath = `${privateObjectDir}/${objectId}`;
    const { bucketName, objectName } = parseObjectPath(fullPath);

    const client = getR2Client();
    const uploadURL = await getSignedUrl(
      client,
      new PutObjectCommand({ Bucket: bucketName, Key: objectName }),
      { expiresIn: 900 },
    );

    return { uploadURL, objectPath: `/objects/${objectName}` };
  }

  /**
   * Resolve an objectPath ("/objects/<key>") to an R2ObjectRef.
   * Throws ObjectNotFoundError when the path is invalid or the object
   * does not exist in R2.
   */
  async getObjectEntityFile(objectPath: string): Promise<R2ObjectRef> {
    if (!objectPath.startsWith("/objects/")) throw new ObjectNotFoundError();

    const key = objectPath.slice("/objects/".length);
    if (!key) throw new ObjectNotFoundError();

    const privateObjectDir = this.getPrivateObjectDir();
    const { bucketName, objectName: keyPrefix } = parseObjectPath(privateObjectDir);

    // Enforce that the requested key lives within PRIVATE_OBJECT_DIR to
    // prevent callers from reading arbitrary bucket objects via crafted paths.
    if (keyPrefix && !key.startsWith(`${keyPrefix}/`)) {
      throw new ObjectNotFoundError();
    }

    const client = getR2Client();
    try {
      await client.send(new HeadObjectCommand({ Bucket: bucketName, Key: key }));
    } catch (err: unknown) {
      const name = (err as { name?: string }).name;
      if (name === "NotFound" || name === "NoSuchKey") throw new ObjectNotFoundError();
      throw err;
    }

    return { bucket: bucketName, key };
  }

  /**
   * Normalise an object entity path to the canonical "/objects/<key>" form.
   *
   * - "/objects/..."         → returned as-is (already canonical)
   * - "/api/storage/objects/..." → strips the route prefix (legacy format)
   * - anything else          → returned as-is (e.g. external URLs)
   *
   * Callers that need a guaranteed-canonical path for new uploads should use
   * getObjectEntityUploadURL() which derives objectPath deterministically.
   */
  normalizeObjectEntityPath(rawPath: string): string {
    const LEGACY_PREFIX = "/api/storage";
    if (rawPath.startsWith(`${LEGACY_PREFIX}/objects/`)) {
      return rawPath.slice(LEGACY_PREFIX.length);
    }
    return rawPath;
  }

  async trySetObjectEntityAclPolicy(
    rawPath: string,
    aclPolicy: ObjectAclPolicy,
  ): Promise<string> {
    const normalizedPath = this.normalizeObjectEntityPath(rawPath);
    if (!normalizedPath.startsWith("/")) return normalizedPath;

    const objectRef = await this.getObjectEntityFile(normalizedPath);
    await setObjectAclPolicy(objectRef, aclPolicy);
    return normalizedPath;
  }

  async deleteObjectEntity(rawPath: string): Promise<void> {
    const normalizedPath = this.normalizeObjectEntityPath(rawPath);
    if (!normalizedPath.startsWith("/objects/")) return;

    try {
      const objectRef = await this.getObjectEntityFile(normalizedPath);
      const client = getR2Client();
      await client.send(
        new DeleteObjectCommand({ Bucket: objectRef.bucket, Key: objectRef.key }),
      );
    } catch (err) {
      if (err instanceof ObjectNotFoundError) return;
      throw err;
    }
  }

  async canAccessObjectEntity({
    userId,
    objectRef,
    requestedPermission,
  }: {
    userId?: string;
    objectRef: R2ObjectRef;
    requestedPermission?: ObjectPermission;
  }): Promise<boolean> {
    return canAccessObject({
      userId,
      objectRef,
      requestedPermission: requestedPermission ?? ObjectPermission.READ,
    });
  }
}

import {
  HeadObjectCommand,
  CopyObjectCommand,
} from "@aws-sdk/client-s3";
import { getR2Client } from "./r2Client";

const ACL_POLICY_METADATA_KEY = "acl-policy";

export interface R2ObjectRef {
  bucket: string;
  key: string;
}

// Can be flexibly defined according to the use case.
//
// Examples:
// - USER_LIST: the users from a list stored in the database;
// - EMAIL_DOMAIN: the users whose email is in a specific domain;
// - GROUP_MEMBER: the users who are members of a specific group;
// - SUBSCRIBER: the users who are subscribers of a specific service / content
//   creator.
export enum ObjectAccessGroupType {}

export interface ObjectAccessGroup {
  type: ObjectAccessGroupType;
  // The logic id that identifies qualified group members. Format depends on the
  // ObjectAccessGroupType — e.g. a user-list DB id, an email domain, a group id.
  id: string;
}

export enum ObjectPermission {
  READ = "read",
  WRITE = "write",
}

export interface ObjectAclRule {
  group: ObjectAccessGroup;
  permission: ObjectPermission;
}

// Stored as S3 user-defined metadata under the key "acl-policy" (JSON string).
export interface ObjectAclPolicy {
  owner: string;
  visibility: "public" | "private";
  aclRules?: Array<ObjectAclRule>;
}

function isPermissionAllowed(
  requested: ObjectPermission,
  granted: ObjectPermission,
): boolean {
  if (requested === ObjectPermission.READ) {
    return [ObjectPermission.READ, ObjectPermission.WRITE].includes(granted);
  }
  return granted === ObjectPermission.WRITE;
}

abstract class BaseObjectAccessGroup implements ObjectAccessGroup {
  constructor(
    public readonly type: ObjectAccessGroupType,
    public readonly id: string,
  ) {}

  public abstract hasMember(userId: string): Promise<boolean>;
}

function createObjectAccessGroup(
  group: ObjectAccessGroup,
): BaseObjectAccessGroup {
  switch (group.type) {
    // Implement per access group type, e.g.:
    // case "USER_LIST":
    //   return new UserListAccessGroup(group.id);
    default:
      throw new Error(`Unknown access group type: ${group.type}`);
  }
}

/**
 * Write (or update) the ACL policy for an R2 object.
 * S3/R2 does not support in-place metadata updates — we must CopyObject
 * with MetadataDirective: REPLACE to update user-defined metadata.
 */
export async function setObjectAclPolicy(
  objectRef: R2ObjectRef,
  aclPolicy: ObjectAclPolicy,
): Promise<void> {
  const client = getR2Client();

  const head = await client.send(
    new HeadObjectCommand({ Bucket: objectRef.bucket, Key: objectRef.key }),
  );

  await client.send(
    new CopyObjectCommand({
      Bucket: objectRef.bucket,
      Key: objectRef.key,
      CopySource: `${objectRef.bucket}/${objectRef.key}`,
      MetadataDirective: "REPLACE",
      ContentType: head.ContentType,
      Metadata: {
        ...head.Metadata,
        [ACL_POLICY_METADATA_KEY]: JSON.stringify(aclPolicy),
      },
    }),
  );
}

/**
 * Read the ACL policy from an R2 object's user-defined metadata.
 * Returns null when no policy has been stored.
 */
export async function getObjectAclPolicy(
  objectRef: R2ObjectRef,
): Promise<ObjectAclPolicy | null> {
  const client = getR2Client();
  const head = await client.send(
    new HeadObjectCommand({ Bucket: objectRef.bucket, Key: objectRef.key }),
  );
  const raw = head.Metadata?.[ACL_POLICY_METADATA_KEY];
  if (!raw) return null;
  return JSON.parse(raw) as ObjectAclPolicy;
}

export async function canAccessObject({
  userId,
  objectRef,
  requestedPermission,
}: {
  userId?: string;
  objectRef: R2ObjectRef;
  requestedPermission: ObjectPermission;
}): Promise<boolean> {
  const aclPolicy = await getObjectAclPolicy(objectRef);
  if (!aclPolicy) {
    return false;
  }

  if (
    aclPolicy.visibility === "public" &&
    requestedPermission === ObjectPermission.READ
  ) {
    return true;
  }

  if (!userId) {
    return false;
  }

  if (aclPolicy.owner === userId) {
    return true;
  }

  for (const rule of aclPolicy.aclRules || []) {
    const accessGroup = createObjectAccessGroup(rule.group);
    if (
      (await accessGroup.hasMember(userId)) &&
      isPermissionAllowed(requestedPermission, rule.permission)
    ) {
      return true;
    }
  }

  return false;
}

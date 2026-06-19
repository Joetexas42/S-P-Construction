import { S3Client } from "@aws-sdk/client-s3";

function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

let _client: S3Client | null = null;

export function getR2Client(): S3Client {
  if (!_client) {
    const accountId = requireEnv("R2_ACCOUNT_ID");
    const accessKeyId = requireEnv("R2_ACCESS_KEY_ID");
    const secretAccessKey = requireEnv("R2_SECRET_ACCESS_KEY");

    _client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
    });
  }
  return _client;
}

export function getR2BucketName(): string {
  return requireEnv("R2_BUCKET_NAME");
}

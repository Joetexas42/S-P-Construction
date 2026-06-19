import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// ---------------------------------------------------------------------------
// CORS
// Allow the production Cloudflare Pages domain, any *.pages.dev preview, and
// localhost in development. The ALLOWED_ORIGINS env var accepts a
// comma-separated list of extra origins for custom domains.
// ---------------------------------------------------------------------------

const STATIC_ALLOWED_ORIGINS = [
  "https://spconstructiondfw.com",
  "https://www.spconstructiondfw.com",
];

function buildCorsOriginList(): Array<string | RegExp> {
  const extra = (process.env["ALLOWED_ORIGINS"] ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  return [
    ...STATIC_ALLOWED_ORIGINS,
    ...extra,
    // Cloudflare Pages preview deployments (multi-label: <hash>.<project>.pages.dev)
    /^https:\/\/[a-z0-9][a-z0-9.-]*\.pages\.dev$/,
    // Local development
    /^http:\/\/localhost(:\d+)?$/,
    /^http:\/\/127\.0\.0\.1(:\d+)?$/,
  ];
}

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(
  cors({
    origin: buildCorsOriginList(),
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;

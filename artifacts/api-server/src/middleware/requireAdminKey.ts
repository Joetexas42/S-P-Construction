import { type Request, type Response, type NextFunction } from "express";

export function requireAdminKey(req: Request, res: Response, next: NextFunction): void {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    req.log.error("ADMIN_SECRET env var is not configured");
    res.status(500).json({ error: "Server misconfiguration" });
    return;
  }
  const provided = req.headers["x-admin-key"];
  if (!provided || provided !== secret) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  next();
}

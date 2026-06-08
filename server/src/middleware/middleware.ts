// server/src/middleware/auth.middleware.ts
import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const token =
    (req.cookies as Record<string, string>)?.token ??
    req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }

  req.user = decoded;
  next();
}
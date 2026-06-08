import { Request, Response, NextFunction } from "express";
import { permissions } from "../config/permission";

export function authorize(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const role = req.user.role as keyof typeof permissions;

    const userPermissions = permissions[role];

    if (!userPermissions.includes(permission as any)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
}

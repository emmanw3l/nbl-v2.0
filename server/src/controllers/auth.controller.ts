// server/src/controllers/auth.controller.ts
import type { Request, Response, NextFunction } from "express";
import prisma from "../config/db";
import { comparePassword } from "../utils/hash";
import { signToken, setTokenCookie, clearTokenCookie } from "../utils/jwt";

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) {
      res.status(400).json({ error: "Email and password required" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    setTokenCookie(res, token);

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (err) { next(err); }
}

export function logout(_req: Request, res: Response): void {
  clearTokenCookie(res);
  res.json({ message: "Logged out" });
}

export async function me(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where:  { id: req.user!.id },
      select: { id: true, email: true, name: true, role: true },
    });
    if (!user) { res.status(404).json({ error: "User not found" }); return; }
    res.json({ user });
  } catch (err) { next(err); }
}
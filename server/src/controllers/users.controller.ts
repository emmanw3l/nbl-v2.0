// server/src/controllers/users.controller.ts
import type { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import prisma from "../config/db";
import { hashPassword } from "../utils/hash";

const safeSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  isActive: true,
  createdAt: true,
} as const;

interface CreateUserBody {
  email: string;
  password: string;
  name: string;
  role?: Role;
}
interface UpdateUserBody {
  name?: string;
  email?: string;
  role?: Role;
  isActive?: boolean;
  password?: string;
}

export async function getUsers(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: safeSelect,
    });
    res.json({ users });
  } catch (err) {
    next(err);
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, password, name, role } = req.body as CreateUserBody;
    if (!email || !password || !name) {
      res.status(400).json({ error: "email, password, and name are required" });
      return;
    }
    if (password.length < 8) {
      res.status(400).json({ error: "Password must be at least 8 characters" });
      return;
    }
    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashed, name, role: role ?? "ADMIN" },
      select: safeSelect,
    });
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

export async function updateUser(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = parseInt(req.params.id, 10);
    if (Number.isNaN(userId)) {
      res.status(400).json({ error: "Invalid user id" });
      return;
    }
    const { name, email, role, isActive, password } =
      req.body as UpdateUserBody;
    const data: Omit<UpdateUserBody, "password"> & { password?: string } = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (role !== undefined) data.role = role;
    if (isActive !== undefined) data.isActive = isActive;
    if (password) data.password = await hashPassword(password);

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: safeSelect,
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid user id" });
      return;
    }
    if (id === req.user!.id) {
      res.status(400).json({ error: "You cannot delete your own account" });
      return;
    }
    await prisma.user.delete({ where: { id } });
    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
}

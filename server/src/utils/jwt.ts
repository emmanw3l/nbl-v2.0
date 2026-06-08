// server/src/utils/jwt.ts
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import type { Response } from "express";

export interface JwtPayload {
  id: number;
  email: string;
  role: string;
}


const SECRET: Secret = process.env.JWT_SECRET as Secret;
const EXPIRES = process.env.JWT_EXPIRES_IN ?? "7d";

export const signToken = (payload: JwtPayload): string =>
  jwt.sign(payload, SECRET, { expiresIn: EXPIRES } as SignOptions);

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, SECRET) as JwtPayload;
  } catch {
    return null;
  }
};

export const setTokenCookie = (res: Response, token: string): void => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearTokenCookie = (res: Response): void => {
  res.clearCookie("token");
};

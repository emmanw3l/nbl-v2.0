// server/src/controllers/awards.controller.ts
import type { Request, Response, NextFunction } from "express";
import type { Prisma } from "@prisma/client";
import prisma from "../config/db";

interface Nominee {
  name: string;
  work: string;
}

interface AwardBody {
  description?: string;
  category?: string;
  year?: number | string;
  nominees?: Nominee[];
  winner?: Nominee;
}

export async function getAwards(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const where = req.query.year
      ? { year: parseInt(req.query.year as string, 10) }
      : {};
    const awards = await prisma.award.findMany({
      where,
      orderBy: [{ year: "desc" }, { category: "asc" }],
    });
    res.json({ awards });
  } catch (err) {
    next(err);
  }
}

export async function getAward(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const awardId = parseInt(req.params.id, 10);
    if (Number.isNaN(awardId)) {
      res.status(400).json({ error: "Invalid award id" });
      return;
    }
    const award = await prisma.award.findUnique({ where: { id: awardId } });
    if (!award) {
      res.status(404).json({ error: "Award not found" });
      return;
    }
    res.json({ award });
  } catch (err) {
    next(err);
  }
}

export async function createAward(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { description, category, year, nominees, winner } =
      req.body as AwardBody;
    if (!description || !category || !year || !nominees || !winner) {
      res
        .status(400)
        .json({
          error:
            "description, category, year, nominees, and winner are required",
        });
      return;
    }
    const award = await prisma.award.create({
      data: {
        description,
        category,
        year: parseInt(String(year), 10),
        nominees: nominees as unknown as Prisma.InputJsonValue,
        winner: winner as unknown as Prisma.InputJsonValue,
      },
    });
    res.status(201).json({ award });
  } catch (err) {
    next(err);
  }
}

export async function updateAward(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { description, category, year, nominees, winner } =
      req.body as AwardBody;
    const data: Partial<{
      description: string;
      category: string;
      year: number;
      nominees: Prisma.InputJsonValue;
      winner: Prisma.InputJsonValue;
    }> = {};
    if (description !== undefined) data.description = description;
    if (category !== undefined) data.category = category;
    if (year !== undefined) data.year = parseInt(String(year), 10);
    if (nominees !== undefined)
      data.nominees = nominees as unknown as Prisma.InputJsonValue;
    if (winner !== undefined)
      data.winner = winner as unknown as Prisma.InputJsonValue;

    const awardId = parseInt(req.params.id, 10);
    if (Number.isNaN(awardId)) {
      res.status(400).json({ error: "Invalid award id" });
      return;
    }
    const award = await prisma.award.update({
      where: { id: awardId },
      data,
    });
    res.json({ award });
  } catch (err) {
    next(err);
  }
}

export async function deleteAward(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const awardId = parseInt(req.params.id, 10);
    if (Number.isNaN(awardId)) {
      res.status(400).json({ error: "Invalid award id" });
      return;
    }
    await prisma.award.delete({ where: { id: awardId } });
    res.json({ message: "Award deleted" });
  } catch (err) {
    next(err);
  }
}

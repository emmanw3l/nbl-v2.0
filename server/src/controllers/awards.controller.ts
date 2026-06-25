import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import prisma from "../config/db";

interface NomineeInput {
  authorId: number | string;
  work?: string;
  link?: string;
  isWinner: boolean;
  entryId?: string; 
}

interface AwardBody {
  description?: string;
  category?: string;
  year?: number | string;
  nominees?: NomineeInput[];
}

// ── Helpers ────────────────────────────────────────────────────────────────

// Safely extract a single string from req.query (which can be string | string[])
function queryString(val: unknown): string | undefined {
  if (typeof val === "string") return val;
  if (Array.isArray(val) && typeof val[0] === "string") return val[0];
  return undefined;
}

const nomineeInclude = {
  nominees: {
    include: {
      author: { select: { id: true, name: true, slug: true } },
    },
    orderBy: { isWinner: "desc" as const },
  },
};

// Maps incoming nominees to Prisma create objects.
// Nominees that share an entryId become a joint nomination (same slot).
// Any nominee with no entryId gets its own unique one (solo nomination).
function buildNomineeCreates(nominees: NomineeInput[]) {
  return nominees.map((n) => ({
    authorId: parseInt(String(n.authorId), 10),
    work: n.work ?? "",
    link: n.link ?? null,
    isWinner: n.isWinner ?? false,
    entryId: n.entryId ?? randomUUID(),
  }));
}

// ── Controllers ────────────────────────────────────────────────────────────

// GET /api/awards?year=2025
export async function getAwards(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const yearStr = queryString(req.query.year);
    const where = yearStr ? { year: parseInt(yearStr, 10) } : {};

    const awards = await prisma.award.findMany({
      where,
      orderBy: [{ year: "desc" }, { category: "asc" }],
      include: nomineeInclude,
    });
    res.json({ awards });
  } catch (err) {
    next(err);
  }
}

// GET /api/awards/:id
export async function getAward(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const award = await prisma.award.findUnique({
      where: { id: parseInt(String(req.params.id), 10) },
      include: nomineeInclude,
    });
    if (!award) {
      res.status(404).json({ error: "Award not found" });
      return;
    }
    res.json({ award });
  } catch (err) {
    next(err);
  }
}

// POST /api/awards
export async function createAward(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const {
      description,
      category,
      year,
      nominees = [],
    } = req.body as AwardBody;

    if (!description || !category || !year) {
      res
        .status(400)
        .json({ error: "description, category, and year are required" });
      return;
    }

    const award = await prisma.award.create({
      data: {
        description,
        category,
        year: parseInt(String(year), 10),
        nominees: {
          create: buildNomineeCreates(nominees),
        },
      },
      include: nomineeInclude,
    });
    res.status(201).json({ award });
  } catch (err) {
    next(err);
  }
}

// PUT /api/awards/:id
export async function updateAward(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = parseInt(String(req.params.id), 10);
    const { description, category, year, nominees } = req.body as AwardBody;

    // Delete and recreate nominees when provided
    if (nominees !== undefined) {
      await prisma.awardNominee.deleteMany({ where: { awardId: id } });
    }

    const award = await prisma.award.update({
      where: { id },
      data: {
        ...(description !== undefined && { description }),
        ...(category !== undefined && { category }),
        ...(year !== undefined && { year: parseInt(String(year), 10) }),
        ...(nominees !== undefined && {
          nominees: {
            create: buildNomineeCreates(nominees),
          },
        }),
      },
      include: nomineeInclude,
    });
    res.json({ award });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/awards/:id
export async function deleteAward(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // onDelete: Cascade on AwardNominee handles nominees automatically
    await prisma.award.delete({
      where: { id: parseInt(String(req.params.id), 10) },
    });
    res.json({ message: "Award deleted" });
  } catch (err) {
    next(err);
  }
}

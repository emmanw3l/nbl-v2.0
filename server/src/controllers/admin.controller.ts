// server/src/controllers/admin.controller.ts
import type { Request, Response, NextFunction } from "express";
import prisma from "../config/db";

export async function getStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [totalPrompts, totalAuthors, totalAwards, totalUsers, promptsByYear] =
      await Promise.all([
        prisma.prompt.count(),
        prisma.author.count(),
        prisma.award.count(),
        prisma.user.count(),
        prisma.prompt.groupBy({
          by:      ["year"],
          _count:  { id: true },
          orderBy: { year: "desc" },
        }),
      ]);

    res.json({
      stats: {
        totalPrompts, totalAuthors, totalAwards, totalUsers,
        promptsByYear: promptsByYear.map((r) => ({ year: r.year, count: r._count.id })),
      },
    });
  } catch (err) { next(err); }
}
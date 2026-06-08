// server/src/controllers/prompts.controller.ts
import type { Request, Response, NextFunction } from "express";
import prisma from "../config/db";

interface PromptBody {
  title?: string;
  content?: string;
  month?: number | string;
  year?: number | string;
  slug?: string;
  authorId?: number | string;
  
}

// GET /api/prompts?year=2025&month=3
export async function getPrompts(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { year, month } = req.query;
    const where: { year?: number; month?: number } = {};
    if (year) where.year = parseInt(year as string, 10);
    if (month) where.month = parseInt(month as string, 10);

    const prompts = await prisma.prompt.findMany({
      where,
      orderBy: [{ year: "desc" }, { month: "desc" }],
      include: { author: { select: { id: true, name: true, slug: true } } },
    });
    res.json({ prompts });
  } catch (err) {
    next(err);
  }
}

// GET /api/prompts/years
export async function getYears(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const rows = await prisma.prompt.findMany({
      distinct: ["year"],
      select: { year: true },
      orderBy: { year: "desc" },
    });
    res.json({ years: rows.map((r) => r.year) });
  } catch (err) {
    next(err);
  }
}

// GET /api/prompts/:slug
export async function getPromptBySlug(
  req: Request<{ slug: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const prompt = await prisma.prompt.findUnique({
      where: { slug: req.params.slug },
      include: { author: true },
    });
    if (!prompt) {
      res.status(404).json({ error: "Prompt not found" });
      return;
    }
    res.json({ prompt });
  } catch (err) {
    next(err);
  }
}

// POST /api/prompts
export async function createPrompt(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, content, month, year, authorId } = req.body;

    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const wordCount = content.trim().split(/\s+/).length;

    const prompt = await prisma.prompt.create({
      data: {
        title,
        content,
        month: Number(month),
        year: Number(year),
        authorId: Number(authorId),
        userId: req.user.id,
        slug: "temp-slug",
        wordCount,
      },
    });

    const monthName = new Date(0, Number(month) - 1)
      .toLocaleString("en-US", { month: "long" })
      .toLowerCase();

    const slug = `${prompt.id}-${monthName}-${year}`;

    const updatedPrompt = await prisma.prompt.update({
      where: { id: prompt.id },
      data: { slug },
      include: { author: true },
    });

    res.status(201).json({ prompt: updatedPrompt });
  } catch (err) {
    next(err);
  }
  
}

// PUT /api/prompts/:id
export async function updatePrompt(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { title, content, month, year, slug, authorId } =
      req.body as PromptBody;
    const promptId = parseInt(req.params.id, 10);
    if (Number.isNaN(promptId)) {
      res.status(400).json({ error: "Invalid prompt id" });
      return;
      
    }
    
    const data: Partial<{
      title: string;
      content: string;
      month: number;
      year: number;
      slug: string;
      authorId: number;
    }> = {};
    if (title) data.title = title;
    if (content) data.content = content;
    if (month) data.month = parseInt(String(month), 10);
    if (year) data.year = parseInt(String(year), 10);
    if (slug) data.slug = slug;
    if (authorId) data.authorId = parseInt(String(authorId), 10);

    const prompt = await prisma.prompt.update({
      where: { id: promptId },
      data,
      include: { author: true },
    });
    res.json({ prompt });
  } catch (err) {
    next(err);
  }
  
}

// DELETE /api/prompts/:id
export async function deletePrompt(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const promptId = parseInt(req.params.id, 10);
    if (Number.isNaN(promptId)) {
      res.status(400).json({ error: "Invalid prompt id" });
      return;
    }
    await prisma.prompt.delete({ where: { id: promptId } });
    res.json({ message: "Prompt deleted" });
  } catch (err) {
    next(err);
  }
}

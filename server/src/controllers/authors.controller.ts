// server/src/controllers/authors.controller.ts
import type { Request, Response, NextFunction } from "express";
import prisma from "../config/db";

interface AuthorBody {
  name?: string;
  slug?: string;
}

export async function getAuthors(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authors = await prisma.author.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { prompts: true } } },
    });
    res.json({ authors });
  } catch (err) {
    next(err);
  }
}

export async function getAuthorBySlug(
  req: Request<{ slug: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const author = await prisma.author.findUnique({
      where: { slug: req.params.slug },
      include: { prompts: { orderBy: [{ year: "desc" }, { month: "desc" }] } },
    });
    if (!author) {
      res.status(404).json({ error: "Author not found" });
      return;
    }
    res.json({ author });
  } catch (err) {
    next(err);
  }
}

export async function createAuthor(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { name, slug } = req.body as AuthorBody;
    if (!name || !slug) {
      res.status(400).json({ error: "name and slug are required" });
      return;
    }
    const author = await prisma.author.create({ data: { name, slug } });
    res.status(201).json({ author });
  } catch (err) {
    next(err);
  }
}

export async function updateAuthor(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { name, slug } = req.body as AuthorBody;
    const authorId = parseInt(req.params.id, 10);
    if (Number.isNaN(authorId)) {
      res.status(400).json({ error: "Invalid author id" });
      return;
    }

    const data: AuthorBody = {};
    if (name) data.name = name;
    if (slug) data.slug = slug;
    if (!Object.keys(data).length) {
      res
        .status(400)
        .json({ error: "At least one field is required to update" });
      return;
    }

    const author = await prisma.author.update({
      where: { id: authorId },
      data,
    });
    res.json({ author });
  } catch (err) {
    next(err);
  }
}

export async function deleteAuthor(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid author id" });
      return;
    }
    const count = await prisma.prompt.count({ where: { authorId: id } });
    if (count > 0) {
      res
        .status(400)
        .json({
          error: `Cannot delete — this author has ${count} prompt(s). Reassign them first.`,
        });
      return;
    }
    await prisma.author.delete({ where: { id } });
    res.json({ message: "Author deleted" });
  } catch (err) {
    next(err);
  }
}

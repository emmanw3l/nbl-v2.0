"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrompts = getPrompts;
exports.getYears = getYears;
exports.getPromptBySlug = getPromptBySlug;
exports.createPrompt = createPrompt;
exports.updatePrompt = updatePrompt;
exports.deletePrompt = deletePrompt;
const db_1 = __importDefault(require("../config/db"));
// GET /api/prompts?year=2025&month=3
async function getPrompts(req, res, next) {
    try {
        const { year, month } = req.query;
        const where = {};
        if (year)
            where.year = parseInt(year, 10);
        if (month)
            where.month = parseInt(month, 10);
        const prompts = await db_1.default.prompt.findMany({
            where,
            orderBy: [{ year: "desc" }, { month: "desc" }],
            include: { author: { select: { id: true, name: true, slug: true } } },
        });
        res.json({ prompts });
    }
    catch (err) {
        next(err);
    }
}
// GET /api/prompts/years
async function getYears(req, res, next) {
    try {
        const rows = await db_1.default.prompt.findMany({
            distinct: ["year"],
            select: { year: true },
            orderBy: { year: "desc" },
        });
        res.json({ years: rows.map((r) => r.year) });
    }
    catch (err) {
        next(err);
    }
}
// GET /api/prompts/:slug
async function getPromptBySlug(req, res, next) {
    try {
        const prompt = await db_1.default.prompt.findUnique({
            where: { slug: req.params.slug },
            include: { author: true },
        });
        if (!prompt) {
            res.status(404).json({ error: "Prompt not found" });
            return;
        }
        res.json({ prompt });
    }
    catch (err) {
        next(err);
    }
}
// POST /api/prompts
async function createPrompt(req, res, next) {
    try {
        const { title, content, month, year, authorId } = req.body;
        if (!req.user) {
            res.status(401).json({ error: "Not authenticated" });
            return;
        }
        const wordCount = content.trim().split(/\s+/).length;
        const prompt = await db_1.default.prompt.create({
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
        const updatedPrompt = await db_1.default.prompt.update({
            where: { id: prompt.id },
            data: { slug },
            include: { author: true },
        });
        res.status(201).json({ prompt: updatedPrompt });
    }
    catch (err) {
        next(err);
    }
}
// PUT /api/prompts/:id
async function updatePrompt(req, res, next) {
    try {
        const { title, content, month, year, slug, authorId } = req.body;
        const promptId = parseInt(req.params.id, 10);
        if (Number.isNaN(promptId)) {
            res.status(400).json({ error: "Invalid prompt id" });
            return;
        }
        const data = {};
        if (title)
            data.title = title;
        if (content)
            data.content = content;
        if (month)
            data.month = parseInt(String(month), 10);
        if (year)
            data.year = parseInt(String(year), 10);
        if (slug)
            data.slug = slug;
        if (authorId)
            data.authorId = parseInt(String(authorId), 10);
        const prompt = await db_1.default.prompt.update({
            where: { id: promptId },
            data,
            include: { author: true },
        });
        res.json({ prompt });
    }
    catch (err) {
        next(err);
    }
}
// DELETE /api/prompts/:id
async function deletePrompt(req, res, next) {
    try {
        const promptId = parseInt(req.params.id, 10);
        if (Number.isNaN(promptId)) {
            res.status(400).json({ error: "Invalid prompt id" });
            return;
        }
        await db_1.default.prompt.delete({ where: { id: promptId } });
        res.json({ message: "Prompt deleted" });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=prompts.controller.js.map
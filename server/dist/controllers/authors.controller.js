"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthors = getAuthors;
exports.getAuthorBySlug = getAuthorBySlug;
exports.createAuthor = createAuthor;
exports.updateAuthor = updateAuthor;
exports.deleteAuthor = deleteAuthor;
const db_1 = __importDefault(require("../config/db"));
async function getAuthors(_req, res, next) {
    try {
        const authors = await db_1.default.author.findMany({
            orderBy: { name: "asc" },
            include: { _count: { select: { prompts: true } } },
        });
        res.json({ authors });
    }
    catch (err) {
        next(err);
    }
}
async function getAuthorBySlug(req, res, next) {
    try {
        const author = await db_1.default.author.findUnique({
            where: { slug: req.params.slug },
            include: { prompts: { orderBy: [{ year: "desc" }, { month: "desc" }] } },
        });
        if (!author) {
            res.status(404).json({ error: "Author not found" });
            return;
        }
        res.json({ author });
    }
    catch (err) {
        next(err);
    }
}
async function createAuthor(req, res, next) {
    try {
        const { name, slug } = req.body;
        if (!name || !slug) {
            res.status(400).json({ error: "name and slug are required" });
            return;
        }
        const author = await db_1.default.author.create({ data: { name, slug } });
        res.status(201).json({ author });
    }
    catch (err) {
        next(err);
    }
}
async function updateAuthor(req, res, next) {
    try {
        const { name, slug } = req.body;
        const authorId = parseInt(req.params.id, 10);
        if (Number.isNaN(authorId)) {
            res.status(400).json({ error: "Invalid author id" });
            return;
        }
        const data = {};
        if (name)
            data.name = name;
        if (slug)
            data.slug = slug;
        if (!Object.keys(data).length) {
            res
                .status(400)
                .json({ error: "At least one field is required to update" });
            return;
        }
        const author = await db_1.default.author.update({
            where: { id: authorId },
            data,
        });
        res.json({ author });
    }
    catch (err) {
        next(err);
    }
}
async function deleteAuthor(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) {
            res.status(400).json({ error: "Invalid author id" });
            return;
        }
        const count = await db_1.default.prompt.count({ where: { authorId: id } });
        if (count > 0) {
            res
                .status(400)
                .json({
                error: `Cannot delete — this author has ${count} prompt(s). Reassign them first.`,
            });
            return;
        }
        await db_1.default.author.delete({ where: { id } });
        res.json({ message: "Author deleted" });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=authors.controller.js.map
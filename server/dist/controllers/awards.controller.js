"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAwards = getAwards;
exports.getAward = getAward;
exports.createAward = createAward;
exports.updateAward = updateAward;
exports.deleteAward = deleteAward;
const db_1 = __importDefault(require("../config/db"));
async function getAwards(req, res, next) {
    try {
        const where = req.query.year
            ? { year: parseInt(req.query.year, 10) }
            : {};
        const awards = await db_1.default.award.findMany({
            where,
            orderBy: [{ year: "desc" }, { category: "asc" }],
        });
        res.json({ awards });
    }
    catch (err) {
        next(err);
    }
}
async function getAward(req, res, next) {
    try {
        const awardId = parseInt(req.params.id, 10);
        if (Number.isNaN(awardId)) {
            res.status(400).json({ error: "Invalid award id" });
            return;
        }
        const award = await db_1.default.award.findUnique({ where: { id: awardId } });
        if (!award) {
            res.status(404).json({ error: "Award not found" });
            return;
        }
        res.json({ award });
    }
    catch (err) {
        next(err);
    }
}
async function createAward(req, res, next) {
    try {
        const { description, category, year, nominees, winner } = req.body;
        if (!description || !category || !year || !nominees || !winner) {
            res
                .status(400)
                .json({
                error: "description, category, year, nominees, and winner are required",
            });
            return;
        }
        const award = await db_1.default.award.create({
            data: {
                description,
                category,
                year: parseInt(String(year), 10),
                nominees: nominees,
                winner: winner,
            },
        });
        res.status(201).json({ award });
    }
    catch (err) {
        next(err);
    }
}
async function updateAward(req, res, next) {
    try {
        const { description, category, year, nominees, winner } = req.body;
        const data = {};
        if (description !== undefined)
            data.description = description;
        if (category !== undefined)
            data.category = category;
        if (year !== undefined)
            data.year = parseInt(String(year), 10);
        if (nominees !== undefined)
            data.nominees = nominees;
        if (winner !== undefined)
            data.winner = winner;
        const awardId = parseInt(req.params.id, 10);
        if (Number.isNaN(awardId)) {
            res.status(400).json({ error: "Invalid award id" });
            return;
        }
        const award = await db_1.default.award.update({
            where: { id: awardId },
            data,
        });
        res.json({ award });
    }
    catch (err) {
        next(err);
    }
}
async function deleteAward(req, res, next) {
    try {
        const awardId = parseInt(req.params.id, 10);
        if (Number.isNaN(awardId)) {
            res.status(400).json({ error: "Invalid award id" });
            return;
        }
        await db_1.default.award.delete({ where: { id: awardId } });
        res.json({ message: "Award deleted" });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=awards.controller.js.map
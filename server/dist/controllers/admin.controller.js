"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = getStats;
const db_1 = __importDefault(require("../config/db"));
async function getStats(_req, res, next) {
    try {
        const [totalPrompts, totalAuthors, totalAwards, totalUsers, promptsByYear] = await Promise.all([
            db_1.default.prompt.count(),
            db_1.default.author.count(),
            db_1.default.award.count(),
            db_1.default.user.count(),
            db_1.default.prompt.groupBy({
                by: ["year"],
                _count: { id: true },
                orderBy: { year: "desc" },
            }),
        ]);
        res.json({
            stats: {
                totalPrompts, totalAuthors, totalAwards, totalUsers,
                promptsByYear: promptsByYear.map((r) => ({ year: r.year, count: r._count.id })),
            },
        });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=admin.controller.js.map
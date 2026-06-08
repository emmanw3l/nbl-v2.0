"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/config/db.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});
exports.default = prisma;
//# sourceMappingURL=db.js.map
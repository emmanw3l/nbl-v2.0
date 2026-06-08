"use strict";
// import express from "express";
// import cors from "cors";
// import { PrismaClient } from "@prisma/client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// const prisma = new PrismaClient();
// app.use(cors());
// app.use(express.json());
// app.get("/api/prompts", async (_req, res) => {
//   try {
//     const prompts = await prisma.prompt.findMany({
//       include: {
//         author: true,
//       },
//       orderBy: {
//         year: "desc",
//       },
//     });
//     res.json(prompts);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch prompts" });
//   }
// });
// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });
// server/src/index.ts
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const error_middleware_1 = require("./middleware/error.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const prompts_routes_1 = __importDefault(require("./routes/prompts.routes"));
const authors_routes_1 = __importDefault(require("./routes/authors.routes"));
const awards_routes_1 = __importDefault(require("./routes/awards.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 5000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL ?? "http://localhost:5173", credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/prompts", prompts_routes_1.default);
app.use("/api/authors", authors_routes_1.default);
app.use("/api/awards", awards_routes_1.default);
app.use("/api/users", users_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.get("/api/health", (_, res) => res.json({ ok: true }));
app.use((_req, res) => res.status(404).json({ error: "Not found" }));
app.use(error_middleware_1.errorHandler);
app.listen(PORT, () => console.log(`🚀  Server on http://localhost:${PORT}`));
//# sourceMappingURL=index.js.map
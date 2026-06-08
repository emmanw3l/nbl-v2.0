// import express from "express";
// import cors from "cors";
// import { PrismaClient } from "@prisma/client";

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
import "dotenv/config";
import express from "express";
import cors    from "cors";
import helmet  from "helmet";
import morgan  from "morgan";
import cookieParser from "cookie-parser";
import rateLimit    from "express-rate-limit";

import { errorHandler } from "./middleware/error.middleware";
import authRoutes    from "./routes/auth.routes";
import promptRoutes  from "./routes/prompts.routes";
import authorRoutes  from "./routes/authors.routes";
import awardRoutes   from "./routes/awards.routes";
import userRoutes    from "./routes/users.routes";
import adminRoutes   from "./routes/admin.routes";

const app  = express();
const PORT = process.env.PORT ?? 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL ?? "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

app.use("/api/auth",    authRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/awards",  awardRoutes);
app.use("/api/users",   userRoutes);
app.use("/api/admin",   adminRoutes);

app.get("/api/health", (_, res) => res.json({ ok: true }));
app.use((_req, res) => res.status(404).json({ error: "Not found" }));
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀  Server on http://localhost:${PORT}`));
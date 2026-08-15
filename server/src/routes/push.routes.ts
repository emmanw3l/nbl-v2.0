// src/routes/push.ts
import { Router } from "express";
import { subscribeToPushEndpoint } from "../controllers/push.controller";

const router = Router();
router.post("/subscribe", subscribeToPushEndpoint);
export default router;
import { Router } from "express";
import { getStats } from "../controllers/admin.controller";

const adminRoutes = Router();

adminRoutes.get("/stats", getStats);

export default adminRoutes;

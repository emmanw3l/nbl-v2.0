import { Router } from "express";
import { login, logout, me } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/me", me);

export default authRoutes;

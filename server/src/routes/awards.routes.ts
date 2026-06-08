import { Router } from "express";
import {
  getAwards,
  getAward,
  createAward,
  updateAward,
  deleteAward,
} from "../controllers/awards.controller";

const awardRoutes = Router();

awardRoutes.get("/", getAwards);
awardRoutes.get("/:id", getAward);
awardRoutes.post("/", createAward);
awardRoutes.put("/:id", updateAward);
awardRoutes.delete("/:id", deleteAward);

export default awardRoutes;

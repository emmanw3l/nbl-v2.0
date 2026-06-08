import { Router } from "express";

import { authenticate } from "../middleware/middleware";
import {
  getPrompts,
  getYears,
  getPromptBySlug,
  createPrompt,
  updatePrompt,
  deletePrompt,
} from "../controllers/prompts.controller";
import { authorize } from "../middleware/authorize";

const router = Router();

router.get("/", getPrompts);
router.get("/years", getYears);
router.get("/:slug", getPromptBySlug);
router.post(
  "/",
  authenticate,
  authorize("create_prompt"),
  createPrompt
);
router.put(
  "/:id",
  authenticate,
  authorize("update_prompt"),
  updatePrompt
);
router.delete(
  "/:id",
  authenticate,
  authorize("delete_prompt"),
  deletePrompt
);

export default router;


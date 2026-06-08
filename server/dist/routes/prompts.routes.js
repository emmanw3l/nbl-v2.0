"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware/middleware");
const prompts_controller_1 = require("../controllers/prompts.controller");
const authorize_1 = require("../middleware/authorize");
const router = (0, express_1.Router)();
router.get("/", prompts_controller_1.getPrompts);
router.get("/years", prompts_controller_1.getYears);
router.get("/:slug", prompts_controller_1.getPromptBySlug);
router.post("/", middleware_1.authenticate, (0, authorize_1.authorize)("create_prompt"), prompts_controller_1.createPrompt);
router.put("/:id", middleware_1.authenticate, (0, authorize_1.authorize)("update_prompt"), prompts_controller_1.updatePrompt);
router.delete("/:id", middleware_1.authenticate, (0, authorize_1.authorize)("delete_prompt"), prompts_controller_1.deletePrompt);
exports.default = router;
//# sourceMappingURL=prompts.routes.js.map
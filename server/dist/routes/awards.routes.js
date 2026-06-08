"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const awards_controller_1 = require("../controllers/awards.controller");
const awardRoutes = (0, express_1.Router)();
awardRoutes.get("/", awards_controller_1.getAwards);
awardRoutes.get("/:id", awards_controller_1.getAward);
awardRoutes.post("/", awards_controller_1.createAward);
awardRoutes.put("/:id", awards_controller_1.updateAward);
awardRoutes.delete("/:id", awards_controller_1.deleteAward);
exports.default = awardRoutes;
//# sourceMappingURL=awards.routes.js.map
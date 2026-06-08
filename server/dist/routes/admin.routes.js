"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const adminRoutes = (0, express_1.Router)();
adminRoutes.get("/stats", admin_controller_1.getStats);
exports.default = adminRoutes;
//# sourceMappingURL=admin.routes.js.map
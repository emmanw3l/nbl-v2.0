"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/", users_controller_1.getUsers);
userRoutes.post("/", users_controller_1.createUser);
userRoutes.put("/:id", users_controller_1.updateUser);
userRoutes.delete("/:id", users_controller_1.deleteUser);
exports.default = userRoutes;
//# sourceMappingURL=users.routes.js.map
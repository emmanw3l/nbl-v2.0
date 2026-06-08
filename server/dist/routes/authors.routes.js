"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authors_controller_1 = require("../controllers/authors.controller");
const authorRoutes = (0, express_1.Router)();
authorRoutes.get("/", authors_controller_1.getAuthors);
authorRoutes.get("/:slug", authors_controller_1.getAuthorBySlug);
authorRoutes.post("/", authors_controller_1.createAuthor);
authorRoutes.put("/:id", authors_controller_1.updateAuthor);
authorRoutes.delete("/:id", authors_controller_1.deleteAuthor);
exports.default = authorRoutes;
//# sourceMappingURL=authors.routes.js.map
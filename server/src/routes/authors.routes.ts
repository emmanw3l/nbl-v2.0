import { Router } from "express";
import {
  getAuthors,
  getAuthorBySlug,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authors.controller";
import router from "./admin.routes";

const authorRoutes = Router();

authorRoutes.get("/", getAuthors);
authorRoutes.get("/:slug", getAuthorBySlug);
authorRoutes.post("/", createAuthor);
authorRoutes.put("/:id", updateAuthor);
authorRoutes.delete("/:id", deleteAuthor);

export default authorRoutes;

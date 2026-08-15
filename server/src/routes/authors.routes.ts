import { Router } from "express";
import {
  getAuthors,
  getAuthorBySlug,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  followAuthor,
  checkFollowing,
  unfollowAuthor,
} from "../controllers/authors.controller";
import router from "./admin.routes";

const authorRoutes = Router();

authorRoutes.get("/", getAuthors);
authorRoutes.get("/:slug", getAuthorBySlug);
authorRoutes.post("/", createAuthor);
authorRoutes.put("/:id", updateAuthor);
authorRoutes.post("/:authorId/follow", followAuthor);
authorRoutes.get("/:authorId/following", checkFollowing);
authorRoutes.delete("/:authorId/follow", unfollowAuthor);
authorRoutes.delete("/:id", deleteAuthor);

export default authorRoutes;

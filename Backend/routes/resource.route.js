import { Router } from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import {
  createResource,
  deleteResource,
  editResource,
  getResource,
  getResources,
  likeResource,
  dislikeResource,
  addComment,
  deleteComment,
} from "../controllers/resource.controller.js";

const router = Router();

router.get("/:id", getResource);
router.get("/", getResources);
router.post("/", protectRoute, createResource);
router.put("/:id", protectRoute, editResource);
router.delete("/:id", protectRoute, deleteResource);

// Like, Dislike, and Comment Routes
router.post("/:id/like", protectRoute, likeResource);
router.post("/:id/dislike", protectRoute, dislikeResource);
router.post("/:id/comment", protectRoute, addComment);
router.delete("/:id/comment/:commentId", protectRoute, deleteComment);

export default router;
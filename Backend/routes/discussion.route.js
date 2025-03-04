import Router from 'express';
import { protectRoute } from '../middlewares/protectRoute.js';
import {
  getDiscussion,
  getDiscussions,
  createDiscussion,
  editDiscussion,
  deleteDiscussion,
  likeDiscussion,
  addComment,
  deleteComment,
  likeComment,
  editComment,
} from '../controllers/discussion.controller.js';

const router = Router();

// Discussion Routes
router.get("/:id", getDiscussion);
router.get("/", getDiscussions);
router.post("/", protectRoute, createDiscussion);
router.put("/:id", protectRoute, editDiscussion);
router.delete("/:id", protectRoute, deleteDiscussion);

// Like Discussion
router.post("/:id/like", protectRoute, likeDiscussion);

// Comment Routes
router.post("/:id/comment", protectRoute, addComment);
router.put("/:id/comment/:commentId", protectRoute, editComment);
router.delete("/:id/comment/:commentId", protectRoute, deleteComment);
router.post("/:id/comment/:commentId/like", protectRoute, likeComment);

export default router;
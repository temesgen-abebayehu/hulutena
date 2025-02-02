import Router from 'express';
import { protectRoute } from '../middlewares/protectRoute.js';
import { getDiscussion, getDiscussions, createDiscussion, editDiscussion, deleteDiscussion } from '../controllers/discussion.controller.js';

const router = Router();

router.get("/:id", getDiscussion);
router.get("/", getDiscussions);
router.post("/", protectRoute, createDiscussion);
router.put("/:id", protectRoute, editDiscussion);
router.delete("/:id", protectRoute, deleteDiscussion);

export default router;
import { Router } from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { createChat, getChats, updateChat, deleteChat } from "../controllers/chatWithDoctor.controller.js";

const router = Router();

router.post("/", protectRoute, createChat);
router.put("/:id", protectRoute, updateChat);
router.get("/", protectRoute, getChats);
router.delete("/:id", protectRoute, deleteChat);

export default router;
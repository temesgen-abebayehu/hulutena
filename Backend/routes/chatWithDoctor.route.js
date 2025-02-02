import { Router } from "express";
import {protectRoute} from "../middlewares/protectRoute.js";
import { createChat, getChats, deleteChat } from "../controllers/chatWithDoctor.controller.js";

const router = Router();

router.post("/", protectRoute, createChat);
router.get("/", protectRoute, getChats);
router.delete("/", protectRoute, deleteChat);

export default router;
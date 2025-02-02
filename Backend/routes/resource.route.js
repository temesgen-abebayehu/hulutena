import  Router  from "express";
import { protectRoute } from '../middlewares/protectRoute.js';
import { createResource, deleteResource, editResource, getResource, getResources } from '../controllers/resource.controller.js';

const router = Router();

router.get("/:id", getResource);
router.get("/", getResources);
router.post("/", protectRoute, createResource);
router.put("/:id", protectRoute, editResource);
router.delete("/:id", protectRoute, deleteResource);

export default router;
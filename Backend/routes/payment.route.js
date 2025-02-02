import Router from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import authorizeAdmin from "../middlewares/authorizeAdmin.js";
import { processPayment, getPayment, getPayments, updatePayment, deletePayment } from "../controllers/payment.controller.js";


const router = Router();

router.post("/", protectRoute, processPayment);
router.get("/:id", authorizeAdmin, getPayment);
router.get("/", authorizeAdmin, getPayments);
router.put("/:id", authorizeAdmin, updatePayment);
router.delete("/:id", authorizeAdmin, deletePayment);

export default router;
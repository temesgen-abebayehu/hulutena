import express from "express";
import authorizeAdmin from "../middlewares/authorizeAdmin.js";
import {
  deleteUser,
  deleteVerification,
  getAdminDashboard,
  getUsers,
  getVerification,
  getVerifications,
  reviewVerification,
  updateVerification,
  verifyUser,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", authorizeAdmin, getUsers);
router.delete("/users/:id", authorizeAdmin, deleteUser);
router.post("/users/verify/:id", authorizeAdmin, verifyUser);
router.get("/verifications", authorizeAdmin, getVerifications);
router.post("/verifications/review/:id", authorizeAdmin, reviewVerification);
router.get("/verifications/:id", authorizeAdmin, getVerification);
router.put("/verifications/:id", authorizeAdmin, updateVerification);
router.delete("/verifications/:id", authorizeAdmin, deleteVerification);
router.get("/getadmin", authorizeAdmin, getAdminDashboard);

export default router;

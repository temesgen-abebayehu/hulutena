import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const authorizeDoctor = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    const doctor = await User.findById(decoded.userId).select("-password");
    
    if (!doctor) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!doctor || doctor.role !== "doctor") {
      return res.status(403).json({ message: "Access denied: Authorized Doctor only." });
    }

    req.doctor = doctor;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default authorizeDoctor;

import User from "../models/User.model.js";
import Verification from "../models/Verification.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({role: "patient"});
    if (!users) {
      return res.status(404).json({ error: "Users not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsers controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    };

    const verification = await Verification.findOne({ userId: req.params.id });
    if (!verification) {
        return res.status(404).json({ error: "Verification not found" });
    };

    if (user.isVerified) {
        return res.status(400).json({ error: "User already verified" });
    }
    if(verification.idCard === null ) {
        return res.status(400).json({ error: "ID card not uploaded" });
    }
    if(verification.degreeCertificate === null  && user.role === "doctor") {
        return res.status(400).json({ error: "Degree certificate not uploaded" });
    }
    if(verification.livenessVerified === false) {
        return res.status(400).json({ error: "Liveness not verified" });
    }

    verification.status = "approved";
    verification.adminComments = "User verified successfully";
    verification.adminReviewed = true;
    verification.adminReviewStatus = "approved";
    verification.adminReviewer = req.admin.id;
    await verification.save();

    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error("Error in verifyUser controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getVerifications = async (req, res) => {
  try {
    const verifications = await Verification.find();
    if (!verifications) {
        return res.status(404).json({ error: "Verifications not found" });
    };

    res.status(200).json(verifications);
  } catch (error) {
    console.error("Error in getVerifications controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const reviewVerification = async (req, res) => {
  try {
    const verification = await Verification.findById(req.params.id);
    if (!verification) {
      return res.status(404).json({ error: "Verification not found" });
    }

    verification.adminReviewed = true;
    verification.adminReviewStatus = req.body.status;
    verification.adminReviewer = req.admin.id;
    verification.adminComments = req.body.comments;
    await verification.save();
    res.status(200).json({ message: "Verification reviewed successfully" });
  } catch (error) {
    console.error("Error in reviewVerification controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getVerification = async (req, res) => {
  try {
    const verification = await Verification.findById(req.params.id);
    if (!verification) {
      return res.status(404).json({ error: "Verification not found" });
    }
    res.status(200).json(verification);
  } catch (error) {
    console.error("Error in getVerification controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateVerification = async (req, res) => {
  try {
    const verification = await Verification.findById(req.params.id);
    if (!verification) {
      return res.status(404).json({ error: "Verification not found" });
    }

    verification.status = req.body.status;
    await verification.save();
    res.status(200).json({ message: "Verification updated successfully" });
  } catch (error) {
    console.error("Error in updateVerification controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteVerification = async (req, res) => {
  try {
    const verification = await Verification.findByIdAndDelete(req.params.id);
    if (!verification) {
      return res.status(404).json({ error: "Verification not found" });
    }
    res.status(200).json({ message: "Verification deleted successfully" });
  } catch (error) {
    console.error("Error in deleteVerification controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAdminDashboard = async (req, res) => {
  try {
    const admin = req.admin;
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    if(admin.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admins only." });
    };
    

    const userCount = await User.countDocuments();
    const verificationCount = await Verification.countDocuments();
    const pendingVerifications = await Verification.find({
      status: "pending",
    }).countDocuments();
    const approvedVerifications = await Verification.find({
      status: "approved",
    }).countDocuments();
    const rejectedVerifications = await Verification.find({
      status: "rejected",
    }).countDocuments();
    res.status(200).json({
      userCount,
      verificationCount,
      pendingVerifications,
      approvedVerifications,
      rejectedVerifications,
    });
  } catch (error) {
    console.error("Error in getAdminDashboard controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
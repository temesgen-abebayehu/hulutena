import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import Verification from "../models/Verification.model.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...others } = user._doc;
    if (others.role === "patient") {
        const { specialization, ...patientDetails } = others;
        res.status(200).json(patientDetails);
      } else {
        const { medicalHistory, ...doctorDetails } = others;
        res.status(200).json(doctorDetails);
      }
  } catch (error) {
    console.log(`Error in getUserProfile: ${error.message}`);
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  // Check if the user is updating their own account
  if (req.user._id.toString() !== req.params.id) {
    return res.status(403).json({ message: "You can only update your account." });
  }

  try {
    // Define allowed fields for update
    const allowedUpdates = [
      "fullName",
      "email",
      "contactNumber",
      "profileImage",
      "language",
      "specialization",
      "password",
      "address",
      "dateOfBirth",
      "availability",
      "experience",
      "onlineStatus",
    ];

    // Filter out disallowed fields
    const updates = Object.keys(req.body).reduce((acc, key) => {
      if (allowedUpdates.includes(key)) {
        acc[key] = req.body[key];
      }
      return acc;
    }, {});

    // If password is being updated, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Remove the password from the response
    const { password, ...userData } = updatedUser._doc;

    res.status(200).json(userData);
  } catch (error) {
    console.log(`Error in updateUser: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const verifyProfile = async (req, res) => {
  if (req.user._id.toString() === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const {idCard} = req.body;
      if (!idCard) {
        return res.status(400).json({ message: "Please provide id card image" });
      }      
      if(user.isVerified){
        return res.status(400).json({ message: "Profile already verified" });
      }

      const {degreeCertificate} = req.body;
      if(user.role === "doctor"){        
        if (!degreeCertificate) {
          return res.status(400).json({ message: "Please provide degree certificate image" });
        }
      }

      if(!req.body.livenessVerified){
        return res.status(400).json({ message: "Please provide liveness verification" });
      }

      const verification = new Verification({
        userId: req.params.id,
        idCard: idCard,
        degreeCertificate: degreeCertificate,
        livenessVerified: req.body.livenessVerified,
      });

      await verification.save();

      user.isVerified = true;
      await user.save();
      res.status(200).json({ message: "Profile verified successfully." });
    }
    catch (error) {
      console.log(`Error in verifyProfile: ${error.message}`);
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(403).json({ message: "You can only verify your account" });
  }
};

export const getSenderName = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ name: user.fullName });
  } catch (error) {
    console.log(`Error in getSender: ${error.message}`);
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  if (req.user._id.toString() === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Account deleted successfully." });
    } catch (error) {
      console.log(`Error in deleteUser: ${error.message}`);
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(403).json({ message: "You can only delete your account" });
  }
};
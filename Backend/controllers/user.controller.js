import User from "../models/User.model.js";
import Verification from "../models/Verification.model.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
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
  if (req.user._id.toString() === req.params.id) {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      const updatedUser = await User.findById(req.params.id);
      const { password, ...others } = updatedUser._doc;
      res.status(200).json(others);
    } catch (error) {
      console.log(`Error in updateUser: ${error.message}`);
      res.status(404).json({ message: error.message });
    }
  } else {
    console.log(req.user._id.toString(), req.params.id);
    res.status(403).json({ message: "You can only update your account" });
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
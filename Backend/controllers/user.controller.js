import User from "../models/User.model.js";

export const getUserProfile = async (req, res) => {
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
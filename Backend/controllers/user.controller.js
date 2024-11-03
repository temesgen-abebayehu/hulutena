import User from "../models/User.model.js";

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
      const user = await User.findByIdAndUpdate(req.params.id, {
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
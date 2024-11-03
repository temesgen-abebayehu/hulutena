import User from "../models/User.model.js";

export const getDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' }).select('-password -medicalHistory');
        res.status(200).json(doctors);
    } catch (error) {
        console.log(`Error in getDoctors: ${error.message}`);
        res.status(404).json({ message: error.message });
    }
};
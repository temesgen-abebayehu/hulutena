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

export const getDoctor = async (req, res) => {
    try {
        const doctor = await User.findById(req.params.id).select('-password -medicalHistory');
        res.status(200).json(doctor);
    } catch (error) {
        console.log(`Error in getDoctor: ${error.message}`);
        res.status(404).json({ message: error.message });
    }
};
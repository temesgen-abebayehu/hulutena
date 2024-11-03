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

export const searchDoctor = async (req, res) => {
    try {
      // Initialize query filters
      const filters = { role: 'doctor' };
  
      // Add filters for each query parameter
      if (req.query.address) {
        filters.address = { $regex: req.query.address, $options: 'i' };
      }
      if (req.query.specialty) {
        filters.specialty = { $regex: req.query.specialty, $options: 'i' };
      }
      if (req.query.language) {
        filters.language = { $regex: req.query.language, $options: 'i' };
      }
      if (req.query.gender) {
        filters.gender = req.query.gender.toLowerCase() === 'male' || req.query.gender.toLowerCase() === 'female'
          ? req.query.gender.toLowerCase() 
          : null;
      }      
      if (req.query.avarageRating) {
        filters.avarageRating = { $gte: parseFloat(req.query.avarageRating) };
      }
      if (req.query.experience) {
        filters.experience = { $gte: parseInt(req.query.experience) };
      }
      if (req.query.onlineStatus) {
        filters.onlineStatus = req.query.onlineStatus === 'true';
      }
      if (req.query.numberOfServices) {
        filters.numberOfServices = { $gte: parseInt(req.query.numberOfServices) };
      }
      if (req.query.fullName) {
        filters.fullName = { $regex: req.query.fullName, $options: 'i' };
      }
  
      // Execute query with filters and exclude sensitive and patient fields
      const doctors = await User.find(filters).select('-password -medicalHistory');
  
      res.status(200).json(doctors);
    } catch (error) {
      console.log(`Error in searchDoctor: ${error.message}`);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
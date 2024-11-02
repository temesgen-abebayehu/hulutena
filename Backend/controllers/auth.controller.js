import Doctor from "../models/Doctor.model.js";
import Patient from "../models/patient.model.js";

export const registerPatient = async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    contactNumber,
    email,
    address,
  } = req.body;

  try {
    // Trim input fields
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedAddress = address.trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Validate contact number format (example: 10 digits)
    const contactNumberRegex = /^\d{10}$/;
    if (!contactNumberRegex.test(contactNumber)) {
      return res
        .status(400)
        .json({ message: "Invalid contact number format." });
    }

    // Proceed with registration logic (e.g., save to database)
    const newPatient = new Patient({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      dateOfBirth,
      gender,
      contactNumber,
      email,
      address: trimmedAddress,
    });

    await newPatient.save();
    
    res.status(201).json({ message: "Patient registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const registerDoctor = async (req, res) => {
  const {
    fullName,
    email,
    password,
    address,
    gender,
  } = req.body;

  try {
    // Trim input fields
    const trimmedFullName = fullName.trim();
    const trimmedAddress = address.trim();
    const trimmedPassword = password.trim();   

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Convert gender to lowercase
    const lowerCaseGender = gender.toLowerCase();

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "The data already exists." });
    }

    // Validate password length and complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must be at least 8 characters long and contain uppercase, lowercase, and special character." });
    }

    const doctor = new Doctor({
      fullName: trimmedFullName,
      email,
      password: trimmedPassword,
      address: trimmedAddress,
      gender: lowerCaseGender,
    });

    await doctor.save();
    res.status(200).json({message: 'Doctor registered successfully.'});
    
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
};

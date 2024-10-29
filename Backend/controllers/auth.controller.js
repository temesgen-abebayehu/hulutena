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
    // Assuming you have a Patient model
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

import User from "../models/User.model.js";
import bcrypt from 'bcryptjs';


export const Register = async (req, res) => {
  const {
    fullName,
    email,
    role,
    password,
    contactNumber,
  } = req.body;

  try {
    // Trim input fields
    const trimmedFullName = fullName.trim(); 

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "The data already exists." });
    }

    // Validate contact number format
    const contactNumberRegex = /^(09\d{8}|07\d{8}|251(9|7)\d{8})$/;
    if (!contactNumberRegex.test(contactNumber)) {
      return res.status(400).json({ message: "Invalid Phone number format!" });
    }

    // Validate password length and complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must be at least 8 characters long and contain uppercase, lowercase, and special character." });
    }

    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullName: trimmedFullName,
      email,
      role,
      password: hashedPassword,
      contactNumber,
    });

    await user.save();
    res.status(200).json({message: 'Registered successfully.'});
    
  } catch (error) {
    console.log(`Error in register: ${error}`);
    res.status(500).json({ message: "Something went wrong." });
  }
};

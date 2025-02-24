import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const Register = async (req, res) => {
  const { fullName, email, role, password, confirmPassword, contactNumber } = req.body;

  try {
    // Trim input fields
    const trimmedFullName = fullName.trim();

    // Check password and confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password not match" });
    }


    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "The email already exists." });
    }

    // Check if contact number already exists
    const existingContactNumber = await User.findOne({ contactNumber });
    if (existingContactNumber) {
      return res.status(400).json({ message: "The contact number already exists." });
    }

    // Validate contact number format
    const contactNumberRegex = /^(09\d{8}|07\d{8}|251(9|7)\d{8})$/;
    if (!contactNumberRegex.test(contactNumber)) {
      return res.status(400).json({ message: "Invalid Phone number format!" });
    }

    // Validate password length and complexity
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({
          message:
            "Password must be at least 8 characters long and contain uppercase, lowercase, and special character.",
        });
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
    res.status(200).json({ message: "Registered successfully." });
  } catch (error) {
    console.log(`Error in register: ${error}`);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not exist!" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const { password: pass, ...others } = user._doc;

    if (others.role === "patient") {
      const { specialization, ...patientDetails } = others;
      generateTokenAndSetCookie(patientDetails._id, res);
      res.status(200).json(patientDetails);
    } else {
      const { medicalHistory, ...doctorDetails } = others;
      generateTokenAndSetCookie(doctorDetails._id, res);
      res.status(200).json(doctorDetails);
    }
  } catch (error) {
    console.log(`Error in login: ${error}`);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const Logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out succussfully." });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};


export const AuthenticatUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in AuthenticatUser controller", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};
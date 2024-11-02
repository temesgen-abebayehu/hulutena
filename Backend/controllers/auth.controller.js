import User from "../models/User.model.js";


export const register = async (req, res) => {
  const {
    fullName,
    email,
    role,
    password,
    address,
    gender,
  } = req.body;

  try {
    // Trim input fields
    const trimmedFullName = fullName.trim();
    const trimmedAddress = address.trim();  

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

    // Validate password length and complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must be at least 8 characters long and contain uppercase, lowercase, and special character." });
    }

    const user = new User({
      fullName: trimmedFullName,
      email,
      role,
      password,
      address: trimmedAddress,
      gender,
    });

    await user.save();
    res.status(200).json({message: 'Registered successfully.'});
    
  } catch (error) {
    console.log(`Error in register: ${error}`);
    res.status(500).json({ message: "Something went wrong." });
  }
};

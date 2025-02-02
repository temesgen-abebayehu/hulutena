import React, { useState } from "react";
import { registerUser } from "../services/authService";

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "patient",
    password: "",
    contactNumber: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      await registerUser(formData);
      setMessage("Registration successful! You can now log in.");
      setFormData({ fullName: "", email: "", role: "patient", password: "", contactNumber: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">Create an Account</h1>
        <p className="text-gray-600 text-center mb-6">Join our community and access valuable healthcare resources.</p>

        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
        {message && <p className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{message}</p>}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 font-medium mb-2">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              required
            >
              <option value="patient">User</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center mb-4">
            <input type="checkbox" id="terms" required className="mr-2" />
            <label htmlFor="terms" className="text-gray-600 text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Already Registered */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">Log in here</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLanguage } from "../context/LanguageContext";

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "patient",
    password: "",
    contactNumber: "",
    confirmPassword: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Registration successful! You can now log in.");
        navigate("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed.");
      }
      setFormData({ fullName: "", email: "", role: "patient", password: "", contactNumber: "", confirmPassword: "", gender: "" });
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          {t.registerTitle}
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-semibold mb-2"
            >
              {t.username}
            </label>
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

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              {t.emailAddress}
            </label>
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

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-2"
            >
              Role
            </label>
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

          <div className="mb-4">
            <label
              htmlFor="contactNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number
            </label>
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

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Gender</label>
            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="mr-4">Male</label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                className="mr-2"
              />
              <label>Female</label>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              {t.password}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-7"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
                ) : (
                  <AiOutlineEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-semibold mb-2"
            >
              {t.confirmPassword}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-7"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
                ) : (
                  <AiOutlineEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <input type="checkbox" id="terms" required className="mr-2" />
            <label htmlFor="terms" className="text-gray-600 text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>

          <p className="text-center text-gray-600">
            {t.alreadyHaveAccount}{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              {t.login}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

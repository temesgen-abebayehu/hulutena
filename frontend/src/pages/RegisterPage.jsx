import React, { useState } from "react";

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Add registration logic here (e.g., API call)
    console.log("Registering with:", formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      {/* Register Card */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">
          Create an Account
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Join our community and access valuable healthcare resources.
        </p>
        <form onSubmit={handleRegister}>
          {/* Full Name Input */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name
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

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
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

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
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

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
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
            <input
              type="checkbox"
              id="terms"
              required
              className="mr-2"
            />
            <label htmlFor="terms" className="text-gray-600 text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Already Registered */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline"
          >
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;

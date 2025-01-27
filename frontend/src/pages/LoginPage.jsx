import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here (e.g., API call)
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      {/* Login Card */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">
          Login to Your Account
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Access your healthcare resources and stay connected.
        </p>
        <form onSubmit={handleLogin}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-4">
            <a
              href="#"
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 border-t text-center relative">
          <span className="bg-white px-2 text-gray-500 absolute -top-3 left-1/2 transform -translate-x-1/2">
            OR
          </span>
        </div>

        {/* Social Login */}
        <div className="flex justify-center space-x-4">
          <button className="flex items-center justify-center w-1/2 py-2 border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
            <img
              src="/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Google
          </button>
          <button className="flex items-center justify-center w-1/2 py-2 border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
            <img
              src="/facebook.svg"
              alt="Facebook"
              className="w-5 h-5 mr-2"
            />
            Facebook
          </button>
        </div>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

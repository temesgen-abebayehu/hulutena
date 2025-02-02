// src/services/authService.js
const API_URL = "http://localhost:3000/api/auth";

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Registration failed");

    return data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");

    return data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch(`${API_URL}/logout`, { method: "POST" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Logout failed");

    return data;
  } catch (error) {
    throw error;
  }
};

export const me = async () => {
  try {
    const response = await fetch(`${API_URL}/me`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "An error occurred");

    return data;
  } catch (error) {
    throw error;
  }
};
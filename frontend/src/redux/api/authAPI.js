import axios from "axios";

const API_URL = "http://localhost:5001/api/auth"; // Update if needed

// Register User
export const registerUser = async (userData) => {
  try {
      const response = await axios.post(`${API_URL}/register`, userData, {
          headers: {
              "Content-Type": "application/json",
          },
      });
      return response.data;
  } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      throw error.response?.data || error.message;
  }
};

// Login User
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

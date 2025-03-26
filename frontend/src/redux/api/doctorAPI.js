import axios from "axios";

const API_URL = "http://localhost:5001/api/doctors"; // Update this based on your backend URL

// Fetch all doctors
export const getDoctors = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// Fetch doctor by ID
export const getDoctorById = async (doctorId) => {
  const response = await axios.get(`${API_URL}/${doctorId}`);
  return response.data;
};

// Create a new doctor profile
export const createDoctor = async (doctorData) => {
  const response = await axios.post(`${API_URL}/create`, doctorData);
  return response.data;
};

// Update doctor details
export const updateDoctor = async (doctorId, updatedData) => {
  const response = await axios.put(`${API_URL}/update/${doctorId}`, updatedData);
  return response.data;
};

// Delete doctor profile
export const deleteDoctor = async (doctorId) => {
  const response = await axios.delete(`${API_URL}/delete/${doctorId}`);
  return response.data;
};

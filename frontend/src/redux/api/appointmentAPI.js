import axios from "axios";

const API_URL = "http://localhost:5001/api/appointments"; // Update this based on your backend URL

// Create a new appointment
export const createAppointment = async (appointmentData) => {
  const response = await axios.post(`${API_URL}/create`, appointmentData, {
    withCredentials: true, // If using HTTP-only cookies
  });
  return response.data;
};

// Fetch all appointments
export const getAppointments = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// Fetch appointment by ID
export const getAppointmentById = async (appointmentId) => {
  const response = await axios.get(`${API_URL}/${appointmentId}`);
  return response.data;
};

// Update an appointment
export const updateAppointment = async (appointmentId, updatedData) => {
  const response = await axios.put(`${API_URL}/update/${appointmentId}`, updatedData);
  return response.data;
};

// Delete an appointment
export const deleteAppointment = async (appointmentId) => {
  const response = await axios.delete(`${API_URL}/delete/${appointmentId}`);
  return response.data;
};

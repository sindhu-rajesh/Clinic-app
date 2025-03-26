import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    fetchAppointmentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAppointmentsSuccess: (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
    },
    fetchAppointmentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAppointmentsStart,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;

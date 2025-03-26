import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    doctors: [],
    selectedDoctor: null,
    loading: false,
    error: null,
};

const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        fetchDoctorsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDoctorsSuccess: (state, action) => {
            state.doctors = action.payload;
            state.loading = false;
        },
        fetchDoctorsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        selectDoctor: (state, action) => {
            state.selectedDoctor = action.payload;
        }
    }
});

export const { fetchDoctorsStart, fetchDoctorsSuccess, fetchDoctorsFailure, selectDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;

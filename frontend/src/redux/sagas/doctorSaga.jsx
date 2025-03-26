import { takeLatest, call, put } from "redux-saga/effects";
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../api/doctorAPI";

import {
  fetchDoctorsRequest,
  fetchDoctorsSuccess,
  fetchDoctorsFailure,
  fetchDoctorByIdRequest,
  fetchDoctorByIdSuccess,
  fetchDoctorByIdFailure,
  createDoctorRequest,
  createDoctorSuccess,
  createDoctorFailure,
  updateDoctorRequest,
  updateDoctorSuccess,
  updateDoctorFailure,
  deleteDoctorRequest,
  deleteDoctorSuccess,
  deleteDoctorFailure,
} from "../slices/doctorSlice";

// Handle Fetch All Doctors
function* handleFetchDoctors() {
  try {
    const data = yield call(getDoctors);
    yield put(fetchDoctorsSuccess(data));
  } catch (error) {
    yield put(fetchDoctorsFailure(error.response?.data?.message || "Failed to fetch doctors"));
  }
}

// Handle Fetch Doctor by ID
function* handleFetchDoctorById(action) {
  try {
    const data = yield call(getDoctorById, action.payload);
    yield put(fetchDoctorByIdSuccess(data));
  } catch (error) {
    yield put(fetchDoctorByIdFailure(error.response?.data?.message || "Failed to fetch doctor details"));
  }
}

// Handle Create Doctor
function* handleCreateDoctor(action) {
  try {
    const data = yield call(createDoctor, action.payload);
    yield put(createDoctorSuccess(data));
  } catch (error) {
    yield put(createDoctorFailure(error.response?.data?.message || "Failed to create doctor profile"));
  }
}

// Handle Update Doctor
function* handleUpdateDoctor(action) {
  try {
    const { doctorId, updatedData } = action.payload;
    const data = yield call(updateDoctor, doctorId, updatedData);
    yield put(updateDoctorSuccess(data));
  } catch (error) {
    yield put(updateDoctorFailure(error.response?.data?.message || "Failed to update doctor details"));
  }
}

// Handle Delete Doctor
function* handleDeleteDoctor(action) {
  try {
    yield call(deleteDoctor, action.payload);
    yield put(deleteDoctorSuccess(action.payload));
  } catch (error) {
    yield put(deleteDoctorFailure(error.response?.data?.message || "Failed to delete doctor profile"));
  }
}

// Watcher Saga
export function* watchDoctor() {
  yield takeLatest(fetchDoctorsRequest.type, handleFetchDoctors);
  yield takeLatest(fetchDoctorByIdRequest.type, handleFetchDoctorById);
  yield takeLatest(createDoctorRequest.type, handleCreateDoctor);
  yield takeLatest(updateDoctorRequest.type, handleUpdateDoctor);
  yield takeLatest(deleteDoctorRequest.type, handleDeleteDoctor);
}

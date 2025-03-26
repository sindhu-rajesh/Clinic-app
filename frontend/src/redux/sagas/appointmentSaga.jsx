import { takeLatest, call, put } from "redux-saga/effects";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../api/appointmentAPI";

import {
  createAppointmentRequest,
  createAppointmentSuccess,
  createAppointmentFailure,
  fetchAppointmentsRequest,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
  fetchAppointmentByIdRequest,
  fetchAppointmentByIdSuccess,
  fetchAppointmentByIdFailure,
  updateAppointmentRequest,
  updateAppointmentSuccess,
  updateAppointmentFailure,
  deleteAppointmentRequest,
  deleteAppointmentSuccess,
  deleteAppointmentFailure,
} from "../slices/appointmentSlice";

// Handle Create Appointment
function* handleCreateAppointment(action) {
  try {
    const data = yield call(createAppointment, action.payload);
    yield put(createAppointmentSuccess(data));
  } catch (error) {
    yield put(createAppointmentFailure(error.response?.data?.message || "Failed to create appointment"));
  }
}

// Handle Fetch All Appointments
function* handleFetchAppointments() {
  try {
    const data = yield call(getAppointments);
    yield put(fetchAppointmentsSuccess(data));
  } catch (error) {
    yield put(fetchAppointmentsFailure(error.response?.data?.message || "Failed to fetch appointments"));
  }
}

// Handle Fetch Appointment by ID
function* handleFetchAppointmentById(action) {
  try {
    const data = yield call(getAppointmentById, action.payload);
    yield put(fetchAppointmentByIdSuccess(data));
  } catch (error) {
    yield put(fetchAppointmentByIdFailure(error.response?.data?.message || "Failed to fetch appointment details"));
  }
}

// Handle Update Appointment
function* handleUpdateAppointment(action) {
  try {
    const { appointmentId, updatedData } = action.payload;
    const data = yield call(updateAppointment, appointmentId, updatedData);
    yield put(updateAppointmentSuccess(data));
  } catch (error) {
    yield put(updateAppointmentFailure(error.response?.data?.message || "Failed to update appointment"));
  }
}

// Handle Delete Appointment
function* handleDeleteAppointment(action) {
  try {
    yield call(deleteAppointment, action.payload);
    yield put(deleteAppointmentSuccess(action.payload));
  } catch (error) {
    yield put(deleteAppointmentFailure(error.response?.data?.message || "Failed to delete appointment"));
  }
}

// Watcher Saga
export function* watchAppointment() {
  yield takeLatest(createAppointmentRequest.type, handleCreateAppointment);
  yield takeLatest(fetchAppointmentsRequest.type, handleFetchAppointments);
  yield takeLatest(fetchAppointmentByIdRequest.type, handleFetchAppointmentById);
  yield takeLatest(updateAppointmentRequest.type, handleUpdateAppointment);
  yield takeLatest(deleteAppointmentRequest.type, handleDeleteAppointment);
}

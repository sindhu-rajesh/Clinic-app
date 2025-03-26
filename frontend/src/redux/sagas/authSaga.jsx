/** @format */

import { takeLatest, call, put } from 'redux-saga/effects';
import {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
} from '../slices/authSlice.jsx';

import { registerUser, loginUser } from '../api/authAPI'; // Import both functions

// Handle User Registration
function* handleRegister(action) {
  try {
    const user = yield call(registerUser, action.payload);
    yield put(registerSuccess(user));
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

// Handle User Login
function* handleLogin(action) {
  try {
    const user = yield call(loginUser, action.payload);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

// Watcher Saga
export function* watchAuth() {
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(loginRequest.type, handleLogin);
}

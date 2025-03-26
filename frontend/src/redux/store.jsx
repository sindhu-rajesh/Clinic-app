/** @format */

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './slices/authSlice.jsx';
import doctorReducer from './slices/doctorSlice.jsx';
import appointmentReducer from './slices/appointmentSlice.jsx';
import rootSaga from './sagas'; // Ensure this imports all necessary sagas

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    appointment: appointmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

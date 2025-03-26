/** @format */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import DoctorProfile from './pages/DoctorProfile.jsx';
import AppointmentBooking from './pages/AppointmentBooking.jsx';
import Dashboard from './pages/Dashboard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/Navbar.jsx';
import ProtectedRoute from "./components/routes/ProtectedRoute";


function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Patient Protected Routes */}
        <Route element={<ProtectedRoute role="patient" />}>
          <Route path="/doctor/:id" element={<DoctorProfile />} />
        </Route>
        <Route element={<ProtectedRoute role="patient" />}>
          <Route path="/book/:id" element={<AppointmentBooking />} />
        </Route>
        <Route element={<ProtectedRoute role="patient" />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

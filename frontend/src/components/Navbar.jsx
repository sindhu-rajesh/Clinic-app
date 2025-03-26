import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AppNavbar() {
  const { darkMode, setDarkMode } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);  // Convert to boolean
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <Navbar expand="lg" className={`shadow-lg p-3 ${darkMode ? "bg-dark" : "bg-light"}`}>
      <Container>
        <Navbar.Brand className={darkMode ? "text-light" : "text-dark"}>
          ClinicApp
        </Navbar.Brand>

        <Nav className="ms-auto d-flex align-items-center">
          {/* Theme Toggle */}
          <Nav.Link onClick={() => setDarkMode(!darkMode)} className="cursor-pointer me-3">
            {darkMode ? <FaSun color="yellow" size={22} /> : <FaMoon color="black" size={22} />}
          </Nav.Link>

          {/* Login/Logout Button */}
          {isLoggedIn ? (
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="outline-primary" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;

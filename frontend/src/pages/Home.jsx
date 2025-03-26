import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function Home() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/doctors/")
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Find a Doctor</h2>
      <div className="row">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor._id} className="col-md-4 mb-4">
              <Card className="shadow">
                <Card.Img
                  variant="top"
                  src={
                    doctor.image?.startsWith("http")
                      ? doctor.image
                      : doctor.image
                      ? `http://localhost:5001/image/${doctor.image}`
                      : "https://via.placeholder.com/150" // Default placeholder image
                  }
                  alt={doctor.name || "Doctor"}
                />
                <Card.Body>
                  <Card.Title>{doctor.name || "Unknown Doctor"}</Card.Title>
                  <Card.Text>
                    <strong>Specialty:</strong> {doctor.specialty || "N/A"} <br />
                    <strong>Experience:</strong> {doctor.experience || "N/A"} <br />
                    <strong>Rating:</strong> ⭐ {doctor.rating || "N/A"} <br />
                    <strong>Fees:</strong> ₹{doctor.fees || "N/A"}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="primary" as={Link} to={`/${doctor._id}`}>
                      View Profile
                    </Button>
                    <Button variant="success" as={Link} to={`/book/${doctor._id}`}>
                      Book Appointment
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center">No doctors available</p>
        )}
      </div>
    </div>
  );
}

export default Home;

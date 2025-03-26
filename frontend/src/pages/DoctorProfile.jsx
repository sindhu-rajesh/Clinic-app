import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, Button, Spinner, Row, Col } from "react-bootstrap";
import { FaUserMd, FaStethoscope } from "react-icons/fa";

function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/doctors/${id}`).then((res) => {
      setDoctor(res.data);
    });
  }, [id]);

  if (!doctor) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div className="container mt-5">
      <Card className="shadow-lg p-4">
        <Row className="align-items-center text-center text-md-start">
          <Col xs={12} md={4}>
            <Card.Img 
              variant="top" 
              src={doctor.photo} 
              alt={doctor.name} 
              className="rounded-circle mx-auto d-block" 
              style={{ width: "100%", maxWidth: "150px" }} 
            />
          </Col>
          <Col xs={12} md={8}>
            <Card.Body>
              <h2 className="text-primary"><FaUserMd /> {doctor.name}</h2>
              <p><FaStethoscope /> <b>Specialty:</b> {doctor.specialty}</p>
              <p><b>Experience:</b> {doctor.experience} years</p>
              <p><b>Consultation:</b> {doctor.consultationType.join(", ")}</p>
              <Link to={`/book/${id}`}>
                <Button variant="success" className="mt-3 shadow-lg w-100 w-md-auto">
                  Book Appointment
                </Button>
              </Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default DoctorProfile;

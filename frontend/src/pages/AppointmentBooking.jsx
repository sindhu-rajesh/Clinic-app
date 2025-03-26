import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card, Form, Button, Spinner, Row, Col } from "react-bootstrap";
import { FaClock, FaCreditCard, FaMoneyBill } from "react-icons/fa";

function AppointmentBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [doctor, setDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  useEffect(() => {
    axios.get(`http://localhost:5001/api/doctors/${id}`).then((res) => setDoctor(res.data));
  }, [id]);

  const handleBooking = () => {
    axios
      .post("http://localhost:5001/api/appointments/book", {
        userId: user._id,
        doctorId: id,
        timeSlot: selectedTime,
        paymentMethod,
      })
      .then(() => navigate("/dashboard"));
  };

  if (!doctor) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div className="container mt-5">
      <Card className="shadow-lg p-4">
        <Card.Body>
          <h2 className="text-primary">{doctor.name}</h2>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaClock /> Select Time</Form.Label>
                <Form.Select onChange={(e) => setSelectedTime(e.target.value)}>
                  {doctor.availableSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaCreditCard /> Payment Method</Form.Label>
                <Form.Select onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Cash">Cash</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="success" className="w-100 animate__animated animate__fadeInUp" onClick={handleBooking}>
            Confirm Booking <FaMoneyBill />
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AppointmentBooking;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Tabs, Tab, ListGroup, Spinner, Container } from "react-bootstrap";
import { FaCalendarAlt, FaFileMedical, FaMoneyBill } from "react-icons/fa";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/appointments/user/${user._id}`).then((res) => setAppointments(res.data));
    axios.get(`http://localhost:5001/api/medicalRecords/user/${user._id}`).then((res) => setMedicalRecords(res.data));
    axios.get(`http://localhost:5001/api/payments/user/${user._id}`).then((res) => setPayments(res.data));
  }, [user._id]);

  if (!appointments.length) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container className="mt-5">
      <Tabs defaultActiveKey="appointments" className="mb-3 nav-fill">
        <Tab eventKey="appointments" title={<span><FaCalendarAlt /> Appointments</span>}>
          <ListGroup>
            {appointments.map((appt) => (
              <ListGroup.Item key={appt._id}>{appt.doctorName} - {appt.timeSlot}</ListGroup.Item>
            ))}
          </ListGroup>
        </Tab>

        <Tab eventKey="medicalRecords" title={<span><FaFileMedical /> Medical Records</span>}>
          <ListGroup>
            {medicalRecords.map((record) => (
              <ListGroup.Item key={record._id}>{record.diagnosis} - {record.date}</ListGroup.Item>
            ))}
          </ListGroup>
        </Tab>

        <Tab eventKey="payments" title={<span><FaMoneyBill /> Payments</span>}>
          <ListGroup>
            {payments.map((pay) => (
              <ListGroup.Item key={pay._id}>{pay.amount} - {pay.method}</ListGroup.Item>
            ))}
          </ListGroup>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Dashboard;

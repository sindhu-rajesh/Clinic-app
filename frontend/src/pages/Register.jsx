import React from "react";
import { Form, Button, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    // Validation Schema
    const validationSchema = Yup.object({
        name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be 10 digits")
            .required("Phone number is required"),
        role: Yup.string().oneOf(["patient", "doctor"], "Invalid role").default("patient"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const response = await dispatch(registerRequest(values));

        if (response?.payload?.token) {
            localStorage.setItem("token", response.payload.token);
            toast.success("Registration successful!");
            navigate("/dashboard");
        } else {
            toast.error(error || "Registration failed!");
        }
        
        setSubmitting(false);
    };

    return (
        <Container 
            className="d-flex justify-content-center align-items-center" 
            style={{ minHeight: "100vh", background: "linear-gradient(to right, #ff7e5f, #feb47b)" }}
        >
            <Row className="w-100">
                <Col md={6} sm={12} className="mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Card className="shadow-lg p-4 border-0" style={{ borderRadius: "15px", backgroundColor: "#fff" }}>
                            <Card.Title className="text-center mb-4" style={{ color: "#ff7e5f", fontWeight: "bold" }}>
                                Register
                            </Card.Title>
                            <Formik
                                initialValues={{ name: "", email: "", password: "", phone: "", role: "user" }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <FormikForm>
                                        <Form.Group controlId="name">
                                            <Form.Label>Name</Form.Label>
                                            <Field className="form-control" type="text" name="name" />
                                            <ErrorMessage name="name" component="div" className="text-danger small" />
                                        </Form.Group>

                                        <Form.Group controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Field className="form-control" type="email" name="email" />
                                            <ErrorMessage name="email" component="div" className="text-danger small" />
                                        </Form.Group>

                                        <Form.Group controlId="password">
                                            <Form.Label>Password</Form.Label>
                                            <Field className="form-control" type="password" name="password" />
                                            <ErrorMessage name="password" component="div" className="text-danger small" />
                                        </Form.Group>

                                        <Form.Group controlId="phone">
                                            <Form.Label>Phone</Form.Label>
                                            <Field className="form-control" type="text" name="phone" />
                                            <ErrorMessage name="phone" component="div" className="text-danger small" />
                                        </Form.Group>

                                        <Form.Group controlId="role">
                                            <Form.Label>Role</Form.Label>
                                            <Field as="select" className="form-control" name="role">
                                                <option value="patient">patient</option>
                                                <option value="doctor">doctor</option>
                                            </Field>
                                            <ErrorMessage name="role" component="div" className="text-danger small" />
                                        </Form.Group>

                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button 
                                                type="submit" 
                                                className="w-100 mt-3" 
                                                disabled={loading || isSubmitting} 
                                                style={{ backgroundColor: "#ff7e5f", border: "none" }}
                                            >
                                                {loading || isSubmitting ? <Spinner animation="border" size="sm" /> : "Register"}
                                            </Button>
                                        </motion.div>
                                    </FormikForm>
                                )}
                            </Formik>
                            {error && <p className="text-danger text-center mt-2">{error}</p>}
                        </Card>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;

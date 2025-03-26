import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginRequest } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Validation Schema
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                <Card className="shadow-lg p-4 rounded" style={{ maxWidth: "400px", background: "linear-gradient(135deg, #6e8efb, #a777e3)" }}>
                    <Card.Body>
                        <h2 className="text-center text-white">Login</h2>

                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                setSubmitting(true);
                                try {
                                    const response = await dispatch(loginRequest(values));
                                    if (response.payload?.token) {
                                        localStorage.setItem("token", response.payload.token);
                                        toast.success("Login successful!");
                                        navigate("/");
                                    } else {
                                        toast.error("Invalid credentials");
                                    }
                                } catch (error) {
                                    toast.error("Login failed");
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    {/* Email Field */}
                                    <div className="mb-3">
                                        <label className="text-white">Email</label>
                                        <Field type="email" name="email" className="form-control" />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </div>

                                    {/* Password Field */}
                                    <div className="mb-3">
                                        <label className="text-white">Password</label>
                                        <Field type="password" name="password" className="form-control" />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        variant="light"
                                        className="w-100 mt-3 fw-bold"
                                        as={motion.button}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? <Spinner animation="border" size="sm" /> : "Login"}
                                    </Button>
                                </Form>
                            )}
                        </Formik>

                        {/* Register Link */}
                        <p className="mt-3 text-center text-white">
                            Don't have an account? <Link to="/register" className="text-warning fw-bold">Register here</Link>
                        </p>
                    </Card.Body>
                </Card>
            </motion.div>
        </Container>
    );
}

export default Login;

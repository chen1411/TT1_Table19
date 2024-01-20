import axios from "axios";
import React, { useState, useContext } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

function Signup() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [role, setRole] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUserData } = useContext(UserContext);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const newUser = { username, password, name, role };
            await axios.post("http://localhost:8080/signup", newUser);
            const loginRes = await axios.post("http://localhost:8080/login", {
                username,
                password,
            });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            setLoading(false);
            navigate("/");
        } catch (err) {
            setLoading(false);
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign Up</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="username"
                                        required
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                </Form.Group>
                                <Form.Group id="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="name"
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                                    <Form.Group id="role">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control
                                        type="role"
                                        required
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </Form.Group>
                                <Button disabled={loading} className="w-100 mt-2" type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/login">Log in</Link>
                    </div>
                </>
            </div>
        </Container>
    );
}

export default Signup;
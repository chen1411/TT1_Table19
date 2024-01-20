import React, { useState, useContext } from "react";
import { Form, Button, Card, Alert, Container, Row, Col, Stack } from "react-bootstrap";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import redplane from '../redplane.png'

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const loginUser = { username, password };
            const loginRes = await axios.post("http://localhost:5000/login", loginUser);
            setUserData({
                token: loginRes.data.access_token,
                // user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.access_token);
            navigate("/"); navigate(0);
        } catch (err) {
            setLoading(false);
            err.response.data.msg && setError(err.response.data.msg);
        }
    }
    return (
        <Container>
            <Row>
                <Col xs={3} className="bg-danger"></Col>
                <Col className="bg-dark"><Container
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <>
                            <Stack direction="horizontal" gap={1}>
                                <div className=" text-white p-2"><img src={redplane}></img></div>
                                <div className="text-white p-2"><p className="text-white text-center display-2"> DBSFLY</p></div>
                            </Stack>
                            
                            <Card>
                                <Card.Body>
                                    <h2 className="text-center mb-4">Log In</h2>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group id="username">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="username" required onChange={e => setUsername(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group id="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" required onChange={e => setPassword(e.target.value)} />
                                        </Form.Group>
                                        <Button variant="danger"disabled={loading} className="w-100 mt-2" type="submit">Log In</Button>{' '}
                                    </Form>
                                </Card.Body>
                            </Card>
                            <div className="text-white w-100 text-center mt-2">Don't have an account? <Link to="/signup">Sign up</Link></div>
                        </>
                    </div>
                </Container></Col>
            </Row>
        </Container>
    );
}

export default Login;
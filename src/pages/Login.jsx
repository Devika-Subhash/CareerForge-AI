import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center py-5">
        <Col md={7} lg={5}>
          <div className="border rounded-4 p-4 p-md-5 shadow-sm">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Welcome Back</h2>

              <p className="text-muted">
                Login to continue your career journey.
              </p>
            </div>

            <Form onSubmit={handleLogin}>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100 mb-3"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <p className="text-center text-muted mb-0">
                Don't have an account?{" "}
                <Link to="/signup" className="text-decoration-none">
                  Sign Up
                </Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
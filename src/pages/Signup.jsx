import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center py-5">
        <Col md={8} lg={6}>
          <div className="border rounded-4 p-4 p-md-5 shadow-sm">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Create Your Account</h2>

              <p className="text-muted">
                Start building your career with CareerForge AI.
              </p>
            </div>

            <Form onSubmit={handleSignup}>
              {error && <Alert variant="danger">{error}</Alert>}

              {success && <Alert variant="success">{success}</Alert>}

              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100 mb-3"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              <p className="text-center text-muted mb-0">
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
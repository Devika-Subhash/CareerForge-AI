import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Signup() {
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

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Create a password"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                />
              </Form.Group>

              <Button variant="primary" className="w-100 mb-3">
                Create Account
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
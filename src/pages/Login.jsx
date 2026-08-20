import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login() {
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

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                  <Form.Label>Password</Form.Label>

                  <a href="#" className="text-decoration-none">
                    Forgot Password?
                  </a>
                </div>

                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Remember me"
                className="mb-4"
              />

              <Button variant="primary" className="w-100 mb-3">
                Login
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
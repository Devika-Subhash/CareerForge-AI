import { Container, Nav, Navbar as BootstrapNavbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <BootstrapNavbar bg="white" expand="lg" className="border-bottom">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold">
          CareerForge AI
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle />

        <BootstrapNavbar.Collapse>
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {user ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>

                <Nav.Link as={Link} to="/resume-analyzer">
                  Resume Analyzer
                </Nav.Link>

                <Nav.Link as={Link} to="/interview-prep">
                  Interview Prep
                </Nav.Link>

                <Nav.Link as={Link} to="/job-tracker">
                  Job Tracker
                </Nav.Link>

                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-lg-3 mt-2 mt-lg-0"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>

                <Button
                  as={Link}
                  to="/signup"
                  variant="primary"
                  size="sm"
                  className="ms-lg-3 mt-2 mt-lg-0"
                >
                  Get Started
                </Button>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
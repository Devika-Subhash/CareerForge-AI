import {
  Container,
  Navbar as BootstrapNavbar,
  Nav,
  Button,
} from "react-bootstrap";

import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <BootstrapNavbar
      bg="white"
      expand="lg"
      className="border-bottom py-3"
    >
      <Container>
        <BootstrapNavbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4"
        >
          CareerForge <span className="text-primary">AI</span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="main-navbar" />

        <BootstrapNavbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-3">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/resume-analyzer">
              Resume Analyzer
            </Nav.Link>

            <Nav.Link as={NavLink} to="/interview-prep">
              Interview Prep
            </Nav.Link>

            <Nav.Link as={NavLink} to="/job-tracker">
              Job Tracker
            </Nav.Link>

            <Button
              as={Link}
              to="/login"
              variant="outline-primary"
              className="ms-lg-2"
            >
              Login
            </Button>

            <Button as={Link} to="/signup" variant="primary">
              Get Started
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
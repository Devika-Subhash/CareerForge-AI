import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="border-top py-4">
      <Container className="text-center">
        <h5 className="fw-bold">
          CareerForge <span className="text-primary">AI</span>
        </h5>

        <p className="text-muted mb-2">
          Build your career with confidence.
        </p>

        <small className="text-muted">
          © 2026 CareerForge AI. All rights reserved.
        </small>
      </Container>
    </footer>
  );
}

export default Footer;
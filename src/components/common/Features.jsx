import { Container, Row, Col } from "react-bootstrap";

const features = [
  {
    icon: "bi-file-earmark-check",
    title: "Resume Analyzer",
    description:
      "Analyze your resume and identify areas for improvement based on your career goals.",
  },
  {
    icon: "bi-chat-square-dots",
    title: "AI Interview Prep",
    description:
      "Practice technical and HR interview questions tailored to your target role.",
  },
  {
    icon: "bi-briefcase",
    title: "Job Tracker",
    description:
      "Organize and track your job applications from application to offer.",
  },
];

function Features() {
  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold">
            FEATURES
          </span>

          <h2 className="fw-bold mt-2">
            Everything You Need to Build Your Career
          </h2>

          <p className="text-muted">
            Powerful tools designed to help you prepare, improve, and succeed.
          </p>
        </div>

        <Row className="g-4">
          {features.map((feature) => (
            <Col md={4} key={feature.title}>
              <div className="bg-white rounded-4 p-4 h-100 shadow-sm">
                <div className="fs-2 text-primary mb-3">
                  <i className={`bi ${feature.icon}`}></i>
                </div>

                <h4 className="fw-bold">
                  {feature.title}
                </h4>

                <p className="text-muted mb-0">
                  {feature.description}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Features;
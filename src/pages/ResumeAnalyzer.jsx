import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function ResumeAnalyzer() {
  const [resume, setResume] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = (e) => {
    e.preventDefault();

    if (!resume || !jobRole || !jobDescription) {
      setError("Please fill in all fields.");
      setShowResult(false);
      return;
    }

    setError("");
    setShowResult(true);
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Resume Analyzer</h2>

        <p className="text-muted">
          Analyze your resume based on your target role and job description.
        </p>
      </div>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <Form onSubmit={handleAnalyze}>
                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Target Job Role</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Example: React Developer"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Paste Your Resume</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={8}
                    placeholder="Paste your resume content here..."
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Job Description</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" variant="primary">
                  <i className="bi bi-stars me-2"></i>
                  Analyze Resume
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {showResult && (
            <Card className="border-0 shadow-sm mt-4">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3">
                  Resume Analysis
                </h4>

                <div className="mb-3">
                  <strong>Target Role:</strong> {jobRole}
                </div>

                <div className="mb-3">
                  <strong>ATS Match Score:</strong>

                  <div className="progress mt-2">
                    <div
                      className="progress-bar"
                      style={{ width: "75%" }}
                    >
                      75%
                    </div>
                  </div>
                </div>

                <div>
                  <strong>Suggestions:</strong>

                  <ul className="mt-2 mb-0">
                    <li>Add more role-specific technical skills.</li>
                    <li>Include measurable achievements in your projects.</li>
                    <li>Use keywords from the job description.</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ResumeAnalyzer;
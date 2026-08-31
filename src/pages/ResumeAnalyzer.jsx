import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Badge,
  ProgressBar,
} from "react-bootstrap";

function ResumeAnalyzer() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [result, setResult] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!resume.trim() || !jobDescription.trim()) {
      setError(
        "Please enter both your resume content and the job description."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/resume/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            resume,
            jobDescription,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to analyze resume.");
        return;
      }

      setResult(data);
    } catch (error) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      {/* Page Heading */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Resume Analyzer</h2>

        <p className="text-muted">
          Analyze your resume and discover how well it matches your target
          job.
        </p>
      </div>

      <Row className="justify-content-center">
        <Col lg={10}>
          <Form onSubmit={handleAnalyze}>
            {/* Error */}
            {error && (
              <Alert variant="danger">
                {error}
              </Alert>
            )}

            {/* Input Cards */}
            <Row className="g-4">
              {/* Resume */}
              <Col md={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="fs-3 text-primary me-3">
                        <i className="bi bi-file-earmark-text"></i>
                      </div>

                      <div>
                        <h4 className="fw-bold mb-1">
                          Your Resume
                        </h4>

                        <p className="text-muted mb-0">
                          Paste your resume content below.
                        </p>
                      </div>
                    </div>

                    <Form.Group>
                      <Form.Control
                        as="textarea"
                        rows={14}
                        placeholder="Paste your resume content here..."
                        value={resume}
                        onChange={(e) =>
                          setResume(e.target.value)
                        }
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>

              {/* Job Description */}
              <Col md={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="fs-3 text-primary me-3">
                        <i className="bi bi-briefcase"></i>
                      </div>

                      <div>
                        <h4 className="fw-bold mb-1">
                          Job Description
                        </h4>

                        <p className="text-muted mb-0">
                          Paste the job description you want to match.
                        </p>
                      </div>
                    </div>

                    <Form.Group>
                      <Form.Control
                        as="textarea"
                        rows={14}
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) =>
                          setJobDescription(e.target.value)
                        }
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Analyze Button */}
            <div className="text-center mt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="px-4"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>

                    Analyzing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-search me-2"></i>
                    Analyze Resume
                  </>
                )}
              </Button>
            </div>
          </Form>

          {/* Analysis Results */}
          {result && (
            <div className="mt-5">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h3 className="fw-bold">
                      Resume Analysis Result
                    </h3>

                    <p className="text-muted">
                      Here's how well your resume matches the job
                      description.
                    </p>
                  </div>

                  {/* Score */}
                  <Card className="border mb-4">
                    <Card.Body className="p-4 text-center">
                      <h5 className="fw-bold mb-3">
                        Match Score
                      </h5>

                      <h1 className="display-4 fw-bold text-primary">
                        {result.score}%
                      </h1>

                      <ProgressBar
                        now={result.score}
                        label={`${result.score}%`}
                        className="mt-3"
                      />
                    </Card.Body>
                  </Card>

                  <Row className="g-4">
                    {/* Matching Skills */}
                    <Col md={6}>
                      <Card className="border h-100">
                        <Card.Body className="p-4">
                          <h5 className="fw-bold mb-3">
                            <i className="bi bi-check-circle text-success me-2"></i>
                            Matching Skills
                          </h5>

                          {result.matchingSkills &&
                          result.matchingSkills.length > 0 ? (
                            <div className="d-flex flex-wrap gap-2">
                              {result.matchingSkills.map(
                                (skill, index) => (
                                  <Badge
                                    bg="success"
                                    key={index}
                                  >
                                    {skill}
                                  </Badge>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-muted mb-0">
                              No matching skills found.
                            </p>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>

                    {/* Missing Skills */}
                    <Col md={6}>
                      <Card className="border h-100">
                        <Card.Body className="p-4">
                          <h5 className="fw-bold mb-3">
                            <i className="bi bi-exclamation-circle text-warning me-2"></i>
                            Missing Skills
                          </h5>

                          {result.missingSkills &&
                          result.missingSkills.length > 0 ? (
                            <div className="d-flex flex-wrap gap-2">
                              {result.missingSkills.map(
                                (skill, index) => (
                                  <Badge
                                    bg="warning"
                                    text="dark"
                                    key={index}
                                  >
                                    {skill}
                                  </Badge>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-muted mb-0">
                              No major missing skills found.
                            </p>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  {/* Suggestions */}
                  <Card className="border mt-4">
                    <Card.Body className="p-4">
                      <h5 className="fw-bold mb-3">
                        <i className="bi bi-lightbulb text-primary me-2"></i>
                        Suggestions
                      </h5>

                      {result.suggestions &&
                      result.suggestions.length > 0 ? (
                        <ul className="mb-0">
                          {result.suggestions.map(
                            (suggestion, index) => (
                              <li key={index} className="mb-2">
                                {suggestion}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p className="text-muted mb-0">
                          No suggestions available.
                        </p>
                      )}
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ResumeAnalyzer;
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Features from "../components/common/Features";

function Home() {
  return (
    <>
      <section className="py-5">
        <Container>
          <Row
            className="align-items-center py-5"
            style={{ minHeight: "75vh" }}
          >
            <Col lg={7}>
              <span className="badge text-bg-primary mb-3">
                AI-Powered Career Growth
              </span>

              <h1 className="display-4 fw-bold mb-4">
                Build Your Career with
                <span className="text-primary">
                  {" "}AI-Powered
                </span>{" "}
                Guidance
              </h1>

              <p className="lead text-muted mb-4">
                Analyze your resume, prepare for interviews, identify skill
                gaps, and track your job applications — all in one platform.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <Button
                  as={Link}
                  to="/signup"
                  variant="primary"
                  size="lg"
                >
                  Get Started
                  <i className="bi bi-arrow-right ms-2"></i>
                </Button>

                <Button
                  as={Link}
                  to="/resume-analyzer"
                  variant="outline-dark"
                  size="lg"
                >
                  Explore Features
                </Button>
              </div>
            </Col>

            <Col lg={5} className="mt-5 mt-lg-0">
              <div className="bg-light rounded-4 p-4 shadow-sm">
                <div className="bg-white rounded-4 p-4">
                  <div className="d-flex justify-content-between mb-4">
                    <div>
                      <small className="text-muted">
                        Career Score
                      </small>

                      <h2 className="fw-bold mb-0">
                        85%
                      </h2>
                    </div>

                    <div className="text-success fs-3">
                      <i className="bi bi-graph-up-arrow"></i>
                    </div>
                  </div>

                  <div
                    className="progress mb-4"
                    style={{ height: "10px" }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "85%" }}
                    ></div>
                  </div>

                  <div className="border rounded-3 p-3 mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-file-earmark-text text-primary fs-4"></i>

                      <div>
                        <strong>Resume Analysis</strong>

                        <p className="text-muted mb-0 small">
                          Optimize your resume
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-3 p-3 mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-chat-square-text text-primary fs-4"></i>

                      <div>
                        <strong>Interview Prep</strong>

                        <p className="text-muted mb-0 small">
                          Practice with AI questions
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-3 p-3">
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-briefcase text-primary fs-4"></i>

                      <div>
                        <strong>Job Tracker</strong>

                        <p className="text-muted mb-0 small">
                          Manage your applications
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Features />
    </>
  );
}

export default Home;
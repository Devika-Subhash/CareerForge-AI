import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";

function Dashboard() {
  const stats = [
    {
      title: "Career Score",
      value: "85%",
      icon: "bi-graph-up-arrow",
    },
    {
      title: "Resumes",
      value: "2",
      icon: "bi-file-earmark-text",
    },
    {
      title: "Interview Prep",
      value: "12",
      icon: "bi-chat-square-text",
    },
    {
      title: "Applications",
      value: "8",
      icon: "bi-briefcase",
    },
  ];

  return (
    <Container className="py-5">
      <div className="mb-5">
        <h2 className="fw-bold">Welcome back!</h2>
        <p className="text-muted mb-0">
          Here is an overview of your career progress.
        </p>
      </div>

      <Row className="g-4 mb-5">
        {stats.map((stat) => (
          <Col md={6} lg={3} key={stat.title}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted mb-2">
                      {stat.title}
                    </p>

                    <h3 className="fw-bold mb-0">
                      {stat.value}
                    </h3>
                  </div>

                  <div className="fs-3 text-primary">
                    <i className={`bi ${stat.icon}`}></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4">Career Progress</h4>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Resume Strength</span>
                  <span>80%</span>
                </div>

                <ProgressBar now={80} />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Interview Preparation</span>
                  <span>65%</span>
                </div>

                <ProgressBar now={65} />
              </div>

              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Job Applications</span>
                  <span>50%</span>
                </div>

                <ProgressBar now={50} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4">Recent Activity</h4>

              <div className="border-bottom pb-3 mb-3">
                <strong>Resume analyzed</strong>
                <p className="text-muted small mb-0">
                  Your resume score is 80%
                </p>
              </div>

              <div className="border-bottom pb-3 mb-3">
                <strong>Interview session completed</strong>
                <p className="text-muted small mb-0">
                  You answered 10 questions
                </p>
              </div>

              <div>
                <strong>New job application added</strong>
                <p className="text-muted small mb-0">
                  Frontend Developer
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
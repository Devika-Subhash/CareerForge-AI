import { useEffect, useState } from "react";
import { Container, Card, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function InterviewHistory() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviewHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication required.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/interview/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Unable to fetch interview history.");
          return;
        }

        setInterviews(data.interviews || []);
      } catch (error) {
        console.error("Interview history error:", error);
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewHistory();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Interview History</h2>

        <p className="text-muted">
          Review your previous interview practice sessions.
        </p>
      </div>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="text-muted mt-3">
            Loading interview history...
          </p>
        </div>
      )}

      {!loading && error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {!loading && !error && interviews.length === 0 && (
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center p-5">
            <div className="fs-1 text-muted mb-3">
              <i className="bi bi-clock-history"></i>
            </div>

            <h4 className="fw-bold">
              No Interview History
            </h4>

            <p className="text-muted">
              You have not completed any interview practice sessions yet.
            </p>

            <Button
              variant="primary"
              onClick={() => navigate("/interview-prep")}
            >
              Start an Interview
            </Button>
          </Card.Body>
        </Card>
      )}

      {!loading && !error && interviews.length > 0 && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">
              Previous Interviews
            </h4>

            <Button
              variant="outline-primary"
              onClick={() => navigate("/interview-prep")}
            >
              <i className="bi bi-plus-lg me-2"></i>
              New Interview
            </Button>
          </div>

          {interviews.map((interview) => (
            <Card
              key={interview._id}
              className="border-0 shadow-sm mb-3"
            >
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="fw-bold mb-2">
                      {interview.jobRole}
                    </h5>

                    <p className="text-muted mb-0">
                      <i className="bi bi-calendar3 me-2"></i>
                      {formatDate(interview.createdAt)}
                    </p>

                    <p className="text-muted mb-0 mt-1">
                      <i className="bi bi-question-circle me-2"></i>
                      {interview.questions.length} Questions
                    </p>
                  </div>

                  <div className="text-end">
                    <p className="text-muted mb-1">
                      Score
                    </p>

                    <h3 className="fw-bold text-primary mb-0">
                      {interview.score}%
                    </h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}

export default InterviewHistory;
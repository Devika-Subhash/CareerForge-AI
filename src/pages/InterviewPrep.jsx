import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Badge,
  ProgressBar,
  Alert,
} from "react-bootstrap";

function InterviewPrep() {
  const [jobRole, setJobRole] = useState("");
  const [questions, setQuestions] = useState([]);

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const [showResults, setShowResults] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const startInterview = async (e) => {
    e.preventDefault();

    if (!jobRole.trim()) {
      setError("Please enter a job role.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSaveMessage("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in again.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/interview/questions?jobRole=${encodeURIComponent(
          jobRole
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to load interview questions.");
        return;
      }

      setQuestions(data.questions);

      setStarted(true);
      setCurrentQuestion(0);
      setAnswer("");
      setAnswers([]);
      setShowResults(false);
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const calculateScore = (answerList = answers) => {
    if (answerList.length === 0 || questions.length === 0) {
      return 0;
    }

    const answeredQuestions = answerList.filter(
      (item) => item && item.trim().length > 20
    ).length;

    return Math.round(
      (answeredQuestions / questions.length) * 100
    );
  };

  const saveInterview = async (finalAnswers) => {
    try {
      setSaving(true);
      setError("");
      setSaveMessage("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in again before saving the interview.");
        return;
      }

      const interviewQuestions = questions.map(
        (question, index) => ({
          question,
          answer: finalAnswers[index] || "",
        })
      );

      const finalScore = calculateScore(finalAnswers);

      const response = await fetch(
        "http://localhost:5000/api/interview",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobRole,
            questions: interviewQuestions,
            score: finalScore,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to save interview.");
        return;
      }

      setSaveMessage("Interview saved successfully.");
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    } finally {
      setSaving(false);
    }
  };

  const nextQuestion = async () => {
    if (!answer.trim()) {
      setError("Please enter your answer before continuing.");
      return;
    }

    const updatedAnswers = [...answers, answer];

    setAnswers(updatedAnswers);
    setError("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer("");
    } else {
      setStarted(false);
      setShowResults(true);
      setAnswer("");

      await saveInterview(updatedAnswers);
    }
  };

  const practiceAgain = () => {
    setJobRole("");
    setQuestions([]);
    setStarted(false);
    setCurrentQuestion(0);
    setAnswer("");
    setAnswers([]);
    setShowResults(false);
    setError("");
    setSaveMessage("");
  };

  const score = calculateScore();

  return (
    <Container className="py-5">
      {/* Heading */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Interview Preparation</h2>

        <p className="text-muted">
          Practice interview questions tailored to your target role.
        </p>
      </div>

      <Row className="justify-content-center">
        <Col lg={8}>
          {/* Start Interview */}
          {!started && !showResults && (
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div className="fs-1 text-primary mb-2">
                    <i className="bi bi-chat-square-text"></i>
                  </div>

                  <h4 className="fw-bold">
                    Start Your Interview Practice
                  </h4>

                  <p className="text-muted mb-0">
                    Enter your target job role and practice role-specific
                    interview questions.
                  </p>
                </div>

                <Form onSubmit={startInterview}>
                  {error && (
                    <Alert variant="danger">
                      {error}
                    </Alert>
                  )}

                  <Form.Group className="mb-4">
                    <Form.Label>Target Job Role</Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Example: React Developer"
                      value={jobRole}
                      onChange={(e) =>
                        setJobRole(e.target.value)
                      }
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>

                        Loading Questions...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-play-fill me-2"></i>
                        Start Practice
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          {/* Interview */}
          {started && questions.length > 0 && (
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">
                    Role: <strong>{jobRole}</strong>
                  </span>

                  <Badge bg="primary">
                    Question {currentQuestion + 1} /{" "}
                    {questions.length}
                  </Badge>
                </div>

                <ProgressBar
                  now={
                    ((currentQuestion + 1) /
                      questions.length) *
                    100
                  }
                  className="mb-4"
                />

                {error && (
                  <Alert variant="danger">
                    {error}
                  </Alert>
                )}

                <h4 className="fw-bold mb-4">
                  {questions[currentQuestion]}
                </h4>

                <Form.Group className="mb-4">
                  <Form.Label>Your Answer</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={7}
                    placeholder="Type your answer here..."
                    value={answer}
                    onChange={(e) =>
                      setAnswer(e.target.value)
                    }
                  />

                  <Form.Text className="text-muted">
                    Try to give a clear and detailed answer.
                  </Form.Text>
                </Form.Group>

                <Button
                  onClick={nextQuestion}
                  variant="primary"
                  disabled={saving}
                >
                  {currentQuestion === questions.length - 1
                    ? "Finish Interview"
                    : "Next Question"}

                  <i className="bi bi-arrow-right ms-2"></i>
                </Button>
              </Card.Body>
            </Card>
          )}

          {/* Results */}
          {showResults && (
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="text-center mb-5">
                  <div className="fs-1 text-success mb-2">
                    <i className="bi bi-check-circle"></i>
                  </div>

                  <h3 className="fw-bold">
                    Interview Completed!
                  </h3>

                  <p className="text-muted">
                    You completed {questions.length} questions for the{" "}
                    <strong>{jobRole}</strong> role.
                  </p>
                </div>

                {/* Save Status */}
                {saving && (
                  <Alert variant="info">
                    Saving your interview...
                  </Alert>
                )}

                {saveMessage && (
                  <Alert variant="success">
                    <i className="bi bi-check-circle me-2"></i>
                    {saveMessage}
                  </Alert>
                )}

                {error && (
                  <Alert variant="danger">
                    {error}
                  </Alert>
                )}

                {/* Score */}
                <Card className="border mb-4">
                  <Card.Body className="p-4 text-center">
                    <p className="text-muted mb-1">
                      Practice Score
                    </p>

                    <h1 className="text-primary fw-bold">
                      {score}%
                    </h1>

                    <ProgressBar
                      now={score}
                      label={`${score}%`}
                    />

                    <small className="text-muted d-block mt-3">
                      Score is currently based on answer completion.
                      AI evaluation can be added later.
                    </small>
                  </Card.Body>
                </Card>

                {/* Answers */}
                <h4 className="fw-bold mb-3">
                  Your Answers
                </h4>

                {questions.map((question, index) => (
                  <div
                    key={index}
                    className="border rounded-3 p-3 mb-3"
                  >
                    <div className="fw-bold mb-2">
                      Question {index + 1}
                    </div>

                    <p className="mb-2">
                      {question}
                    </p>

                    <div className="bg-light rounded p-3">
                      <small className="text-muted">
                        Your Answer
                      </small>

                      <p className="mb-0 mt-1">
                        {answers[index]}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="text-center mt-4">
                  <Button
                    onClick={practiceAgain}
                    variant="primary"
                  >
                    <i className="bi bi-arrow-repeat me-2"></i>
                    Practice Again
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default InterviewPrep;
import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function InterviewPrep() {
  const [jobRole, setJobRole] = useState("");
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");

  const questions = [
    "What is React and why is it used?",
    "What is the difference between props and state?",
    "Explain the useEffect hook.",
    "What is the difference between let, const, and var?",
    "How does React handle component re-rendering?",
  ];

  const startInterview = (e) => {
    e.preventDefault();

    if (!jobRole.trim()) {
      setError("Please enter a job role.");
      return;
    }

    setError("");
    setStarted(true);
    setCurrentQuestion(0);
    setAnswer("");
    setAnswers([]);
    setShowResults(false);
  };

  const nextQuestion = () => {
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
    }
  };

  const practiceAgain = () => {
    setJobRole("");
    setStarted(false);
    setCurrentQuestion(0);
    setAnswer("");
    setAnswers([]);
    setShowResults(false);
    setError("");
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Interview Preparation</h2>

        <p className="text-muted">
          Practice interview questions for your target role.
        </p>
      </div>

      <Row className="justify-content-center">
        <Col lg={8}>
          {!started && !showResults && (
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <Form onSubmit={startInterview}>
                  {error && (
                    <div className="alert alert-danger">
                      {error}
                    </div>
                  )}

                  <Form.Group className="mb-4">
                    <Form.Label>Target Job Role</Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Example: React Developer"
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Start Practice
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          {started && (
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between mb-4">
                  <span className="text-muted">
                    Role: {jobRole}
                  </span>

                  <span className="text-muted">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                </div>

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <h4 className="fw-bold mb-4">
                  {questions[currentQuestion]}
                </h4>

                <Form.Group className="mb-4">
                  <Form.Label>Your Answer</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Type your answer here..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                </Form.Group>

                <Button onClick={nextQuestion} variant="primary">
                  {currentQuestion === questions.length - 1
                    ? "Finish Interview"
                    : "Next Question"}
                </Button>
              </Card.Body>
            </Card>
          )}

          {showResults && (
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="text-center mb-5">
                  <div className="fs-1 text-success mb-2">
                    <i className="bi bi-check-circle"></i>
                  </div>

                  <h3 className="fw-bold">Interview Completed!</h3>

                  <p className="text-muted">
                    You completed all {questions.length} questions for the{" "}
                    {jobRole} role.
                  </p>
                </div>

                <div className="text-center border rounded-4 p-4 mb-4">
                  <p className="text-muted mb-1">
                    Interview Score
                  </p>

                  <h1 className="text-primary fw-bold mb-0">
                    75%
                  </h1>

                  <small className="text-muted">
                    AI evaluation will be added later.
                  </small>
                </div>

                <h4 className="fw-bold mb-3">
                  Your Answers
                </h4>

                {questions.map((question, index) => (
                  <div
                    key={index}
                    className="border rounded-3 p-3 mb-3"
                  >
                    <strong>
                      Question {index + 1}: {question}
                    </strong>

                    <p className="text-muted mb-0 mt-2">
                      {answers[index]}
                    </p>
                  </div>
                ))}

                <div className="text-center mt-4">
                  <Button onClick={practiceAgain} variant="primary">
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
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
  Badge,
} from "react-bootstrap";

function JobTracker() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [error, setError] = useState("");

  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");

    if (savedJobs) {
      return JSON.parse(savedJobs);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (e) => {
    e.preventDefault();

    if (!company.trim() || !role.trim()) {
      setError("Please enter both company name and job role.");
      return;
    }

    const newJob = {
      id: Date.now(),
      company: company,
      role: role,
      status: status,
    };

    setJobs([...jobs, newJob]);

    setCompany("");
    setRole("");
    setStatus("Applied");
    setError("");
  };

  const updateStatus = (id, newStatus) => {
    const updatedJobs = jobs.map((job) => {
      if (job.id === id) {
        return {
          ...job,
          status: newStatus,
        };
      }

      return job;
    });

    setJobs(updatedJobs);
  };

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);

    setJobs(updatedJobs);
  };

  const getStatusColor = (jobStatus) => {
    if (jobStatus === "Applied") {
      return "primary";
    }

    if (jobStatus === "Interview") {
      return "warning";
    }

    if (jobStatus === "Offer") {
      return "success";
    }

    return "secondary";
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Job Tracker</h2>

        <p className="text-muted">
          Keep track of your job applications in one place.
        </p>
      </div>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4">
                Add New Application
              </h4>

              <Form onSubmit={addJob}>
                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Company Name</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Example: Google"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Job Role</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Example: Frontend Developer"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Status</Form.Label>

                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Rejected</option>
                    <option>Offer</option>
                  </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary">
                  <i className="bi bi-plus-lg me-2"></i>
                  Add Application
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4">
                Your Applications
              </h4>

              {jobs.length === 0 ? (
                <p className="text-muted text-center mb-0">
                  No job applications added yet.
                </p>
              ) : (
                <Table responsive hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Update</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td>{job.company}</td>

                        <td>{job.role}</td>

                        <td>
                          <Badge bg={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </td>

                        <td>
                          <Form.Select
                            size="sm"
                            value={job.status}
                            onChange={(e) =>
                              updateStatus(job.id, e.target.value)
                            }
                          >
                            <option>Applied</option>
                            <option>Interview</option>
                            <option>Rejected</option>
                            <option>Offer</option>
                          </Form.Select>
                        </td>

                        <td>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deleteJob(job.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default JobTracker;
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
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/jobs", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to fetch jobs.");
        return;
      }

      setJobs(data);
    } catch (error) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const addJob = async (e) => {
    e.preventDefault();

    if (!company.trim() || !role.trim()) {
      setError("Please enter both company name and job role.");
      return;
    }

    try {
      setError("");

      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          company,
          position: role,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to add job.");
        return;
      }

      setJobs([data, ...jobs]);

      setCompany("");
      setRole("");
      setStatus("Applied");
    } catch (error) {
      setError("Unable to connect to the server.");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      setError("");

      const job = jobs.find((job) => job._id === id);

      const response = await fetch(
        `http://localhost:5000/api/jobs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            company: job.company,
            position: job.position,
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to update job.");
        return;
      }

      setJobs(
        jobs.map((job) => {
          if (job._id === id) {
            return data;
          }

          return job;
        })
      );
    } catch (error) {
      setError("Unable to connect to the server.");
    }
  };

  const deleteJob = async (id) => {
    try {
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/jobs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to delete job.");
        return;
      }

      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      setError("Unable to connect to the server.");
    }
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

              {loading ? (
                <p className="text-muted text-center mb-0">
                  Loading applications...
                </p>
              ) : jobs.length === 0 ? (
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
                      <tr key={job._id}>
                        <td>{job.company}</td>

                        <td>{job.position}</td>

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
                              updateStatus(
                                job._id,
                                e.target.value
                              )
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
                            onClick={() => deleteJob(job._id)}
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
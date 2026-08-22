import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function Dashboard() {
  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });

  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    offer: 0,
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [statsResponse, jobsResponse] = await Promise.all([
        fetch("http://localhost:5000/api/jobs/stats", {
          headers,
        }),
        fetch("http://localhost:5000/api/jobs", {
          headers,
        }),
      ]);

      const statsData = await statsResponse.json();
      const jobsData = await jobsResponse.json();

      if (statsResponse.ok) {
        setStats(statsData);
      }

      if (jobsResponse.ok) {
        setRecentJobs(jobsData.slice(0, 5));
      }
    } catch (error) {
      console.error("Unable to fetch dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    if (status === "Applied") {
      return "primary";
    }

    if (status === "Interview") {
      return "warning";
    }

    if (status === "Offer") {
      return "success";
    }

    return "secondary";
  };

  const dashboardStats = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: "bi-briefcase",
    },
    {
      title: "Applied",
      value: stats.applied,
      icon: "bi-send",
    },
    {
      title: "Interviews",
      value: stats.interview,
      icon: "bi-chat-square-text",
    },
    {
      title: "Offers",
      value: stats.offer,
      icon: "bi-trophy",
    },
  ];

  return (
    <Container className="py-5">
      <div className="mb-5">
        <h2 className="fw-bold">
          Welcome back{user ? `, ${user.name}` : ""}!
        </h2>

        <p className="text-muted mb-0">
          Here is an overview of your job application progress.
        </p>
      </div>

      <Row className="g-4">
        {dashboardStats.map((stat) => (
          <Col md={6} lg={3} key={stat.title}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted mb-2">
                      {stat.title}
                    </p>

                    <h3 className="fw-bold mb-0">
                      {loading ? "..." : stat.value}
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

      <Row className="mt-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">
                  Recent Applications
                </h4>

                <Link
                  to="/job-tracker"
                  className="btn btn-outline-primary btn-sm"
                >
                  View All
                </Link>
              </div>

              {loading ? (
                <p className="text-muted text-center mb-0">
                  Loading applications...
                </p>
              ) : recentJobs.length === 0 ? (
                <p className="text-muted text-center mb-0">
                  No job applications added yet.
                </p>
              ) : (
                <div>
                  {recentJobs.map((job) => (
                    <div
                      key={job._id}
                      className="d-flex justify-content-between align-items-center border-bottom py-3"
                    >
                      <div>
                        <h6 className="fw-semibold mb-1">
                          {job.position}
                        </h6>

                        <p className="text-muted mb-0">
                          {job.company}
                        </p>
                      </div>

                      <Badge bg={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
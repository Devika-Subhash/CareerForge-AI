import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

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

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/jobs/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error("Unable to fetch dashboard statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

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
              <h4 className="fw-bold mb-3">
                Application Overview
              </h4>

              <p className="text-muted mb-0">
                Track your applications, interviews, and offers from your Job
                Tracker.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
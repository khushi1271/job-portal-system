import { useEffect, useState } from "react";
import api from "../../api/axios";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const res = await api.get("/application/my-applications");

      setApplications(res.data.applications || []);
    } catch (error) {
      console.log(error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "#16a34a";

      case "rejected":
        return "#dc2626";

      default:
        return "#f59e0b";
    }
  };

  if (loading) {
    return <h2>Loading Applications...</h2>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: "25px" }}>
        My Applications
      </h1>

      {applications.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>No Applications Found</h2>

          <p style={{ color: "#6b7280" }}>
            You haven't applied for any jobs yet.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {applications.map((item) => (
            <div
              key={item._id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h2>{item.job?.title}</h2>

              <p>
                <strong>Company:</strong>{" "}
                {item.job?.company?.name || "N/A"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {item.job?.location || "N/A"}
              </p>

              <p>
                <strong>Salary:</strong>{" "}
                ₹{item.job?.salary || "Not Mentioned"}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {item.job?.experience} Years
              </p>

              <p>
                <strong>Job Type:</strong>{" "}
                {item.job?.jobType}
              </p>

              <p>
                <strong>Applied On:</strong>{" "}
                {new Date(item.createdAt).toLocaleDateString()}
              </p>

              <p>
                <strong>Resume:</strong>{" "}
                {item.resume ? (
                  <a
                    href={item.resume}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "#2563eb",
                      textDecoration: "none",
                    }}
                  >
                    View Resume
                  </a>
                ) : (
                  "Not Uploaded"
                )}
              </p>

              <span
                style={{
                  display: "inline-block",
                  marginTop: "18px",
                  background: getStatusColor(item.status),
                  color: "#fff",
                  padding: "8px 18px",
                  borderRadius: "25px",
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;
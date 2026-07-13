import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

function JobApplicants() {
  const { id } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/application/job/${id}`);

      setApplications(res.data.applications || []);
    } catch (error) {
      console.log(error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (applicationId, status) => {
    try {
      const res = await api.put(
        `/application/status/${applicationId}`,
        { status }
      );

      alert(res.data.message);

      fetchApplicants();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to update status"
      );
    }
  };

  // ================= STATUS COLOR =================
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
    return <h2>Loading Applicants...</h2>;
  }

  return (
    <div>
      <h1
        style={{
          marginBottom: "25px",
        }}
      >
        Job Applicants
      </h1>

      {applications.length === 0 ? (
        <h2>No Applicants Yet</h2>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {applications.map((app) => (
            <div
              key={app._id}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h2>{app.applicant?.fullName}</h2>

              <p>
                <strong>Email:</strong> {app.applicant?.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {app.applicant?.phone || "N/A"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    background: getStatusColor(app.status),
                    color: "#fff",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {app.status.toUpperCase()}
                </span>
              </p>

              <p>
                <strong>Resume:</strong>{" "}
                {app.resume ? (
                  <a
                    href={app.resume}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Resume
                  </a>
                ) : (
                  "Not Uploaded"
                )}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={() =>
                    updateStatus(app._id, "accepted")
                  }
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#16a34a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(app._id, "rejected")
                  }
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobApplicants;
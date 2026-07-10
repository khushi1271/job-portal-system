
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function RecruiterJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs/recruiter");
      setJobs(res.data.jobs || []);
    } catch (error) {
      console.log(error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Jobs...</h2>;
  }

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Manage Jobs</h1>

        <Link
          to="/recruiter/jobs/add"
          style={{
            textDecoration: "none",
            background: "#2563eb",
            color: "white",
            padding: "10px 18px",
            borderRadius: "8px",
            fontWeight: "500",
          }}
        >
          + Add Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>No Jobs Found</h2>

          <p
            style={{
              color: "#6b7280",
              margin: "15px 0",
            }}
          >
            Create your first job posting.
          </p>

          <Link
            to="/recruiter/jobs/add"
            style={{
              textDecoration: "none",
              background: "#2563eb",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            Create Job
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
            gap: "20px",
          }}
        >
          {jobs.map((job) => (
            <div
              key={job._id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h2>{job.title}</h2>

              <p>
                <strong>Company:</strong>{" "}
                {job.company?.name || "N/A"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {job.location}
              </p>

              <p>
                <strong>Salary:</strong> ₹{job.salary}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {job.experience} Years
              </p>

              <p>
                <strong>Job Type:</strong>{" "}
                {job.jobType}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <Link
                  to={`/recruiter/jobs/edit/${job._id}`}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    textDecoration: "none",
                    background: "#2563eb",
                    color: "white",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                >
                  Edit
                </Link>

                <button
                  style={{
                    flex: 1,
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>

              <Link
                to={`/recruiter/jobs/${job._id}/applicants`}
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "12px",
                  textDecoration: "none",
                  background: "#059669",
                  color: "white",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                View Applicants
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecruiterJobs;

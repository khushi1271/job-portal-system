import { useEffect, useState } from "react";
import api from "../../api/axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, [keyword]);

const fetchJobs = async () => {
  try {
    setLoading(true);
    setError("");

    const res = await api.get(`/jobs?keyword=${keyword}`);

    console.log("SUCCESS");
    console.log("Status:", res.status);
    console.log("Data:", res.data);

    setJobs(res.data.jobs || []);
  } catch (err) {
    console.log("ERROR");
    console.log(err);

    console.log("Status:", err.response?.status);
    console.log("Response:", err.response?.data);

    setError("Failed to load jobs. Please try again.");
    setJobs([]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Available Jobs
      </h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search Jobs..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          width: "320px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          outline: "none",
        }}
      />

      <p
        style={{
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Total Jobs: {jobs.length}
      </p>

      {loading ? (
        <h2>Loading Jobs...</h2>
      ) : error ? (
        <h2
          style={{
            color: "red",
            marginTop: "20px",
          }}
        >
          {error}
        </h2>
      ) : jobs.length === 0 ? (
        <h2>No Jobs Found</h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
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
                {job.company?.name || job.company?.companyName || "N/A"}
              </p>

              <p>
                <strong>Location:</strong> {job.location}
              </p>

              <p>
                <strong>Salary:</strong> ₹{job.salary}
              </p>

              <p>
                <strong>Experience:</strong> {job.experience} Years
              </p>

              <p>
                <strong>Job Type:</strong> {job.jobType}
              </p>

              <p
                style={{
                  color: "#555",
                  margin: "15px 0",
                }}
              >
                {job.description}
              </p>

              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;
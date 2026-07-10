
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function AddJob() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [job, setJob] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experience: "",
    location: "",
    jobType: "",
    position: "",
    company: "",
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await api.get("/company/my-companies");
      setCompanies(res.data.companies || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const jobData = {
        ...job,
        requirements: job.requirements
          .split(",")
          .map((item) => item.trim()),
      };

      const res = await api.post("/jobs/create", jobData);

      alert(res.data.message);

      navigate("/recruiter/jobs");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
      }}
    >
      <h1 style={{ marginBottom: "25px" }}>
        Add New Job
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Job Description"
          rows="5"
          value={job.description}
          onChange={handleChange}
          required
          style={{
            ...inputStyle,
            resize: "vertical",
          }}
        />

        <textarea
          name="requirements"
          placeholder="Requirements (Example: React, Node.js, MongoDB)"
          rows="4"
          value={job.requirements}
          onChange={handleChange}
          required
          style={{
            ...inputStyle,
            resize: "vertical",
          }}
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={job.salary}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience (Years)"
          value={job.experience}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="jobType"
          value={job.jobType}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full Time</option>
          <option value="Part-Time">Part Time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        <input
          type="number"
          name="position"
          placeholder="Open Positions"
          value={job.position}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="company"
          value={job.company}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Select Company</option>

          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {loading ? "Creating..." : "Create Job"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box",
};

export default AddJob;


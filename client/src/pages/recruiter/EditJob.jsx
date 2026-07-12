
import { useState } from "react";

function EditJob() {
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

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      ...job,
      requirements: job.requirements
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const res = await api.put(`/jobs/update/${id}`, payload);

    alert(res.data.message || "Job Updated Successfully");

    navigate("/recruiter/jobs");
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message || "Unable to update job"
    );
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
        Edit Job
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
          placeholder="Description"
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
          placeholder="Requirements"
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
          placeholder="Experience"
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

        <button
          type="submit"
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
          Update Job
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

export default EditJob;


import { useParams } from "react-router-dom";

function JobDetails() {
  const { id } = useParams();

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1>Job Details</h1>

      <p
        style={{
          color: "gray",
          marginBottom: "20px",
        }}
      >
        Job ID : {id}
      </p>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Frontend Developer</h2>

        <p>
          <strong>Company:</strong> Google
        </p>

        <p>
          <strong>Location:</strong> Bangalore
        </p>

        <p>
          <strong>Salary:</strong> ₹12,00,000
        </p>

        <p>
          <strong>Experience:</strong> 2 Years
        </p>

        <p>
          <strong>Job Type:</strong> Full Time
        </p>

        <hr
          style={{
            margin: "20px 0",
          }}
        />

        <h3>Description</h3>

        <p>
          We are looking for a React Developer who has good knowledge of React,
          JavaScript and REST APIs.
        </p>

        <h3>Requirements</h3>

        <ul>
          <li>React.js</li>
          <li>JavaScript</li>
          <li>HTML & CSS</li>
          <li>REST API</li>
        </ul>

        <button
          style={{
            marginTop: "20px",
            padding: "12px 25px",
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
    </div>
  );
}

export default JobDetails;
import { useEffect, useState } from "react";
import api from "../../api/axios";

function RecruiterDashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalCompanies: 0,
    totalApplicants: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [jobRes, companyRes] = await Promise.all([
        api.get("/jobs/recruiter/stats"),
        api.get("/company/my-companies"),
      ]);

      setStats({
        totalJobs: jobRes.data.stats.totalJobs || 0,
        activeJobs: jobRes.data.stats.activeJobs || 0,
        totalCompanies: companyRes.data.count || 0,
        totalApplicants: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  };

  return (
    <div>
      <h1 style={{ marginBottom: "30px" }}>Recruiter Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Companies</h3>
          <h1>{stats.totalCompanies}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Jobs</h3>
          <h1>{stats.totalJobs}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Active Jobs</h3>
          <h1>{stats.activeJobs}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Applicants</h3>
          <h1>{stats.totalApplicants}</h1>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await api.get("/company/my-companies");
      setCompanies(res.data.companies || []);
    } catch (err) {
      console.log(err);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Companies...</h2>;
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
        <h1>Companies</h1>

        <Link
          to="/companies/add"
          style={{
            textDecoration: "none",
            background: "#2563eb",
            color: "white",
            padding: "10px 18px",
            borderRadius: "8px",
            fontWeight: "500",
          }}
        >
          + Add Company
        </Link>
      </div>

      {companies.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "40px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>No Companies Found</h2>

          <p
            style={{
              color: "#6b7280",
              margin: "15px 0",
            }}
          >
            Start by adding your first company.
          </p>

          <Link
            to="/companies/add"
            style={{
              textDecoration: "none",
              background: "#2563eb",
              color: "white",
              padding: "12px 22px",
              borderRadius: "8px",
              display: "inline-block",
              marginTop: "10px",
            }}
          >
            Add Company
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {companies.map((company) => (
            <div
              key={company._id}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h2>{company.name}</h2>

              <p>
                <strong>Website:</strong>{" "}
                {company.website || "N/A"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {company.location || "N/A"}
              </p>

              <p
                style={{
                  color: "#555",
                  margin: "15px 0",
                }}
              >
                {company.description || "No description"}
              </p>

              <Link
                to={`/companies/edit/${company._id}`}
                style={{
                  display: "inline-block",
                  textDecoration: "none",
                  background: "#2563eb",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: "8px",
                }}
              >
                Edit Company
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Companies;



import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState({
    name: "",
    website: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const res = await api.get(`/company/${id}`);

      setCompany({
        name: res.data.company.name || "",
        website: res.data.company.website || "",
        location: res.data.company.location || "",
        description: res.data.company.description || "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to load company");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const res = await api.put(`/company/update/${id}`, company);

      alert(res.data.message);

      navigate("/companies");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message || "Update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
        }}
      >
        Edit Company
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={company.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="url"
          name="website"
          placeholder="Website"
          value={company.website}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={company.location}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="5"
          value={company.description}
          onChange={handleChange}
          style={{
            ...inputStyle,
            resize: "vertical",
          }}
        />

        <button
          type="submit"
          disabled={saving}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          {saving ? "Updating..." : "Update Company"}
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

export default EditCompany;


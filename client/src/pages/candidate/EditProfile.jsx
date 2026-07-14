import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function EditProfile() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    bio: "",
    skills: "",
    education: "",
    experience: "",
    location: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");

      const user = res.data.user;

      setForm({
        fullName: user.fullName || "",
        phone: user.phone || "",
        bio: user.bio || "",
        skills: user.skills ? user.skills.join(", ") : "",
        education: user.education || "",
        experience: user.experience || "",
        location: user.location || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update Profile
      await api.put("/auth/update-profile", form);

      // Upload Resume
      if (resume) {
        const formData = new FormData();

        formData.append("resume", resume);

        await api.put("/auth/upload-resume", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      alert("Profile Updated Successfully");

      navigate("/profile");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Profile update failed"
      );
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
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
        Edit Profile
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="bio"
          placeholder="Bio"
          rows="4"
          value={form.bio}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (Comma separated)"
          value={form.skills}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="education"
          placeholder="Education"
          value={form.education}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={form.experience}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          style={inputStyle}
        />

        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
          }}
        >
          Upload Resume
        </label>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          style={{
            marginBottom: "20px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
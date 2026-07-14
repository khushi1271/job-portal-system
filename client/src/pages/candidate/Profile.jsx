import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Profile...</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <h1>My Profile</h1>

          <Link
            to="/profile/edit"
            style={{
              textDecoration: "none",
              background: "#2563eb",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            Edit Profile
          </Link>
        </div>

        <p><strong>Full Name:</strong> {user?.fullName || "N/A"}</p>

        <p><strong>Email:</strong> {user?.email || "N/A"}</p>

        <p><strong>Phone:</strong> {user?.phone || "N/A"}</p>

        <p><strong>Bio:</strong> {user?.bio || "N/A"}</p>

        <p>
          <strong>Skills:</strong>{" "}
          {user?.skills?.length
            ? user.skills.join(", ")
            : "N/A"}
        </p>

        <p>
          <strong>Education:</strong>{" "}
          {user?.education || "N/A"}
        </p>

        <p>
          <strong>Experience:</strong>{" "}
          {user?.experience || "N/A"}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {user?.location || "N/A"}
        </p>

        <p>
          <strong>Resume:</strong>{" "}
          {user?.resume ? (
            <a
              href={user.resume}
              target="_blank"
              rel="noreferrer"
            >
              View Resume
            </a>
          ) : (
            "Not Uploaded"
          )}
        </p>
      </div>
    </div>
  );
}

export default Profile;
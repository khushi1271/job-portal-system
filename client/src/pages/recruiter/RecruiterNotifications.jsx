import { useEffect, useState } from "react";
import api from "../../api/axios";

function RecruiterNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await api.get("/notifications");

      setNotifications(res.data.notifications || []);
    } catch (error) {
      console.log(error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await api.put(`/notifications/${id}/read`);

      alert(res.data.message);

      fetchNotifications();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to update notification"
      );
    }
  };

  if (loading) {
    return <h2>Loading Notifications...</h2>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: "25px" }}>
        Recruiter Notifications
      </h1>

      {notifications.length === 0 ? (
        <h2>No Notifications</h2>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {notifications.map((item) => (
            <div
              key={item._id}
              style={{
                background: item.isRead ? "#fff" : "#eef6ff",
                border: item.isRead
                  ? "1px solid #ddd"
                  : "2px solid #2563eb",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <h2>{item.title}</h2>

              <p>{item.message}</p>

              <p>
                <strong>From:</strong>{" "}
                {item.sender?.fullName || "System"}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>

              {!item.isRead && (
                <button
                  onClick={() => markAsRead(item._id)}
                  style={{
                    marginTop: "15px",
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecruiterNotifications;
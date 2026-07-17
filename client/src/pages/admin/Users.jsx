import { useEffect, useState } from "react";
import api from "../../api/axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/users");

      setUsers(res.data.users || []);
    } catch (error) {
      console.log(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Users...</h2>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: "25px" }}>
        All Users
      </h1>

      {users.length === 0 ? (
        <h2>No Users Found</h2>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {users.map((user) => (
            <div
              key={user._id}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h2>{user.fullName}</h2>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Phone:</strong> {user.phone}
              </p>

              <p>
                <strong>Role:</strong> {user.role}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {user.isBlocked ? "Blocked" : "Active"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
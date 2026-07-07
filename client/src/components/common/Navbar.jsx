import { FaBell, FaUserCircle, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const user = auth?.user;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        height: "70px",
        backgroundColor: "#2563eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        color: "white",
      }}
    >
      <h2>Job Portal</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "white",
          borderRadius: "8px",
          padding: "8px 12px",
          width: "300px",
        }}
      >
        <FaSearch color="gray" />

        <input
          type="text"
          placeholder="Search Jobs..."
          style={{
            border: "none",
            outline: "none",
            marginLeft: "10px",
            width: "100%",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <FaBell size={20} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FaUserCircle size={28} />
          <span>{user?.fullName ?? "User"}</span>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 15px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
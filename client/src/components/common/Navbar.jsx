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
    // Redux state + localStorage clear
    dispatch(logout());

    // Redirect to Login page
    navigate("/login", { replace: true });
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
      {/* Logo */}
      <h2>Job Portal</h2>

      {/* Search Box */}
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

      {/* Right Section */}
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
          <span>{user?.fullName || "User"}</span>
        </div>

        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
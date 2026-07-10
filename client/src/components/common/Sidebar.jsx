
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaFileAlt,
  FaUser,
  FaBuilding,
} from "react-icons/fa";

function Sidebar() {
  const menu = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      name: "Jobs",
      icon: <FaBriefcase />,
      path: "/jobs",
    },
    {
      name: "Manage Jobs",
      icon: <FaBriefcase />,
      path: "/recruiter/jobs",
    },
    {
      name: "Companies",
      icon: <FaBuilding />,
      path: "/companies",
    },
    {
      name: "Applications",
      icon: <FaFileAlt />,
      path: "/applications",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
  ];

  return (
    <div
      style={{
        width: "260px",
        minWidth: "260px",
        background: "#fff",
        borderRight: "1px solid #e5e7eb",
        minHeight: "calc(100vh - 70px)",
        paddingTop: "25px",
      }}
    >
      <h3
        style={{
          marginLeft: "20px",
          marginBottom: "25px",
          color: "#6b7280",
        }}
      >
        MENU
      </h3>

      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "15px",
            textDecoration: "none",
            padding: "15px 20px",
            margin: "8px",
            borderRadius: "10px",
            fontWeight: "500",
            color: isActive ? "#2563eb" : "#374151",
            background: isActive ? "#dbeafe" : "transparent",
            transition: "0.3s",
          })}
        >
          {item.icon}
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;

import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";

function DashboardLayout() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Sidebar + Content */}
      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 70px)",
          flexWrap: "wrap",
        }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#f8fafc",
            minWidth: "300px",
          }}
        >
          {/* Page Content */}
          <div
            style={{
              flex: 1,
              padding: "20px",
            }}
          >
            <Outlet />
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
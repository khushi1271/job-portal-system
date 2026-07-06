import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";

function DashboardLayout() {
  return (
    <div className="dashboard-layout" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div className="dashboard-body" style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <main className="dashboard-content" style={{ flex: 1, padding: "1.5rem" }}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;

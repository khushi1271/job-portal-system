function AdminDashboard() {
  return (
    <div>
      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        Admin Dashboard 👑
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        <Card title="Total Users" value="0" />
        <Card title="Candidates" value="0" />
        <Card title="Recruiters" value="0" />
        <Card title="Blocked Users" value="0" />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
      }}
    >
      <h3>{title}</h3>

      <h1
        style={{
          color: "#2563eb",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default AdminDashboard;
function Dashboard() {
  return (
    <div>
      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        Welcome 👋
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <Card title="Total Jobs" value="20" />
        <Card title="Applied Jobs" value="5" />
        <Card title="Interviews" value="2" />
        <Card title="Profile Completion" value="80%" />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
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

export default Dashboard;
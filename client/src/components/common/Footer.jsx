function Footer() {
  return (
    <footer
      style={{
        background: "#1e293b",
        color: "white",
        textAlign: "center",
        padding: "15px",
        marginTop: "30px",
      }}
    >
      © {new Date().getFullYear()} Job Portal | Built with React & Node.js
    </footer>
  );
}

export default Footer;
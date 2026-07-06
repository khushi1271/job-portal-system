import React from "react";

function Footer() {
  return (
    <footer className="footer" style={{ padding: "1rem", borderTop: "1px solid #ccc", textAlign: "center" }}>
      <p>&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

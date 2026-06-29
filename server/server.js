require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    console.log("Step 1: Connecting DB...");
    await connectDB();

    console.log("Step 2: Starting Server...");

    app.listen(PORT, "127.0.0.1", () => {
      console.log(`✅ Server Started on http://127.0.0.1:${PORT}`);
    });

  } catch (err) {
    console.error("Server Error:", err);
  }
})();
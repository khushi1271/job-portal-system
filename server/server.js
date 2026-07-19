require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Create HTTP Server
const server = http.createServer(app);

// Create Socket.IO Server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  },
});

// ================= ONLINE USERS =================
const onlineUsers = new Map();

// ================= SOCKET CONNECTION =================
io.on("connection", (socket) => {
  console.log("🟢 User Connected:", socket.id);

  // User joins own room
  socket.on("join", (userId) => {
    socket.join(userId);

    // Save online user
    onlineUsers.set(userId, socket.id);

    console.log(`✅ User Joined Room: ${userId}`);

    // Broadcast online users
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });

  // User Typing
socket.on("typing", (data) => {
  io.to(data.receiver).emit("typing", {
    sender: data.sender,
  });
});

// User Stop Typing
socket.on("stopTyping", (data) => {
  io.to(data.receiver).emit("stopTyping", {
    sender: data.sender,
  });
});

  // Send Message
  socket.on("sendMessage", (data) => {
    io.to(data.receiver).emit("receiveMessage", data);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("🔴 User Disconnected:", socket.id);

    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }

    // Broadcast updated online users
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });
});

// ================= START SERVER =================
(async () => {
  try {
    console.log("Step 1: Connecting DB...");
    await connectDB();

    console.log("Step 2: Starting Server...");

    server.listen(PORT, "127.0.0.1", () => {
      console.log(`✅ Server Started on http://127.0.0.1:${PORT}`);
    });
  } catch (err) {
    console.error("Server Error:", err);
  }
})();
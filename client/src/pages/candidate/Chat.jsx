import { useEffect, useState } from "react";
import api from "../../api/axios";
import socket from "../../socket";

function Chat() {
  const [receiverId, setReceiverId] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

 useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?._id) {
    socket.emit("join", user._id);
  }

  socket.on("receiveMessage", (message) => {
    setMessages((prev) => [...prev, message]);
  });

  return () => {
    socket.off("receiveMessage");
  };
}, []);

useEffect(() => {
  if (receiverId) {
    fetchMessages();
  }
}, [receiverId]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/messages/${receiverId}`);
      setMessages(res.data.messages || []);
    } catch (error) {
      console.log(error);
    }
  };
const sendMessage = async () => {
  if (!text.trim() || !receiverId) return;

  try {
    // Save message in database
    const res = await api.post("/messages/send", {
      receiver: receiverId,
      text,
    });

    // Send real-time message through socket
    socket.emit("sendMessage", {
      sender: res.data.messageData.sender,
      receiver: receiverId,
      text,
      _id: res.data.messageData._id,
      createdAt: res.data.messageData.createdAt,
    });

    // Add message immediately to sender screen
    setMessages((prev) => [...prev, res.data.messageData]);

    setText("");
  } catch (error) {
    console.log(error);
    alert("Failed to send message");
  }
};
  

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        Chat
      </h1>

      <input
        type="text"
        placeholder="Enter Receiver User ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          marginBottom: "20px",
          background: "#fff",
        }}
      >
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              style={{
                marginBottom: "12px",
                padding: "10px",
                borderRadius: "8px",
                background: "#f3f4f6",
              }}
            >
              <strong>{msg.sender?.fullName}:</strong>
              <p>{msg.text}</p>
            </div>
          ))
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
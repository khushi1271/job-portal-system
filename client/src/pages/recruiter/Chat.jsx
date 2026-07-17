import { useEffect, useState } from "react";
import api from "../../api/axios";

function RecruiterChat() {
  const [receiverId, setReceiverId] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

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
    if (!receiverId || !text.trim()) return;

    try {
      await api.post("/messages/send", {
        receiver: receiverId,
        text,
      });

      setText("");
      fetchMessages();
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
        Recruiter Chat
      </h1>

      <input
        type="text"
        placeholder="Enter Candidate User ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      <div
        style={{
          height: "400px",
          overflowY: "auto",
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          marginBottom: "20px",
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
                background: "#f3f4f6",
                borderRadius: "8px",
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
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
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

export default RecruiterChat;
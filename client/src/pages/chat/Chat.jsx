import { useEffect, useRef, useState } from "react";
import api from "../../api/axios";
import socket from "../../socket";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState("");
  const [unreadCounts, setUnreadCounts] = useState({});
const typingTimeout = useRef(null);

  // Auto Scroll Ref
  const messagesEndRef = useRef(null);

  // Format Time
  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

useEffect(() => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  if (loggedInUser) {
    setUser(loggedInUser);
    socket.emit("join", loggedInUser._id);
  }

  socket.on("receiveMessage", (data) => {
  // Add new message
  setMessages((prev) => [...prev, data]);
  setConversations((prev) => {
  const updated = [...prev];

  const senderId =
    typeof data.sender === "object"
      ? data.sender._id
      : data.sender;

  const index = updated.findIndex(
    (chat) => chat.user._id === senderId
  );

  if (index !== -1) {
    updated[index].lastMessage = data.text;

    const latest = updated.splice(index, 1)[0];
    updated.unshift(latest);
  }

  return updated;
});

  // Increase unread count if chat is not currently open
  if (data.sender !== receiverId) {
    setUnreadCounts((prev) => ({
      ...prev,
      [data.sender]:
        (prev[data.sender] || 0) + 1,
    }));
  }
});

  socket.on("onlineUsers", (users) => {
    setOnlineUsers(users);
  });

  socket.on("typing", () => {
  setTyping(true);
});

socket.on("stopTyping", () => {
  setTyping(false);
});

  return () => {
    socket.off("receiveMessage");
    socket.off("onlineUsers");
      socket.off("typing");
      socket.off("stopTyping");
  };
}, []);

// ================= FETCH CONVERSATIONS =================
useEffect(() => {
  const fetchConversations = async () => {
    try {
      const res = await api.get("/messages/conversations");

      setConversations(res.data.conversations || []);
    } catch (error) {
      console.error("Failed to fetch conversations", error);
    }
  };

  fetchConversations();
}, []);


// ================= FETCH UNREAD COUNTS =================
useEffect(() => {
  const fetchUnreadCounts = async () => {
    try {
      const res = await api.get("/messages/unread");

      const unreadMap = {};

      res.data.unread.forEach((item) => {
        unreadMap[item._id] = item.count;
      });

      setUnreadCounts(unreadMap);
    } catch (error) {
      console.error("Failed to fetch unread counts", error);
    }
  };

  fetchUnreadCounts();
}, []);

  // Fetch old messages
  // Fetch old messages + Mark as Seen
useEffect(() => {
  const fetchMessages = async () => {
    if (!receiverId) return;

    try {
      // Fetch messages
      const res = await api.get(`/messages/${receiverId}`);
      setMessages(res.data.messages || []);
      // Clear unread badge for opened chat
setUnreadCounts((prev) => ({
  ...prev,
  [receiverId]: 0,
}));

      // Mark messages as seen
      await api.put(`/messages/seen/${receiverId}`);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };

  fetchMessages();
}, [receiverId]);
  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

const sendMessage = async () => {
  if (!message.trim() || !receiverId) return;

  try {
    const res = await api.post("/messages/send", {
      receiver: receiverId,
      text: message,
    });

    const savedMessage = res.data.messageData;

    // Send message in real-time
    socket.emit("sendMessage", savedMessage);

    // Hide typing indicator immediately
    socket.emit("stopTyping", {
      sender: user._id,
      receiver: receiverId,
    });

    // Clear local typing timeout
    clearTimeout(typingTimeout.current);

    // Add message to chat
    setMessages((prev) => [...prev, savedMessage]);

    // Clear input
    setMessage("");
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Failed to send message. Please make sure you are logged in.");
  }
};

const clearChat = async () => {
  if (!receiverId) {
    alert("Please select a conversation first.");
    return;
  }

  const confirmClear = window.confirm(
    "Are you sure you want to clear this chat?"
  );

  if (!confirmClear) return;

  try {
    await api.delete(`/messages/clear/${receiverId}`);

    setMessages([]);

    alert("Chat cleared successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to clear chat.");
  }
};

const deleteMessage = async (messageId) => {
  const confirmDelete = window.confirm(
    "Delete this message?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/messages/delete/${messageId}`);

    setMessages((prev) =>
      prev.filter((msg) => msg._id !== messageId)
    );
  } catch (error) {
    console.error(error);
    alert("Failed to delete message.");
  }
};

  return (
  <div
    style={{
      maxWidth: "700px",
      margin: "30px auto",
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
      }}
    >
      <h2>Real-Time Chat</h2>

      <button
        onClick={clearChat}
        style={{
          background: "#ef4444",
          color: "#fff",
          border: "none",
          padding: "8px 14px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        🗑️ Clear Chat
      </button>
    </div>

    <div
  style={{
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#f9fafb",
  }}
>

  <input
  type="text"
  placeholder="🔍 Search conversations..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
  }}
/>
  <h3>Recent Conversations</h3>

  {conversations.length === 0 ? (
    <p>No conversations yet.</p>
  ) : (
    conversations
      .filter((chat) =>
        chat.user.fullName.toLowerCase().includes(search.toLowerCase())
      )
      .map((chat) => (
        <div
          key={chat.user._id}
          onClick={() => setReceiverId(chat.user._id)}
          style={{
            padding: "10px",
          cursor: "pointer",
          borderBottom: "1px solid #eee",
        }}
      >
       <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <strong>{chat.user.fullName}</strong>

  {unreadCounts[chat.user._id] > 0 && (
    <span
      style={{
        background: "#22c55e",
        color: "#fff",
        borderRadius: "50%",
        minWidth: "22px",
        height: "22px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      {unreadCounts[chat.user._id]}
    </span>
  )}
</div>

        <p
     style={{
    margin: "4px 0 0",
    color: "#6b7280",
    fontSize: "13px",
  }}
>
  {chat.lastMessage}
</p>
      </div>
    ))
  )}
</div>

    <div
      style={{
        marginBottom: "15px",
        fontWeight: "bold",
        fontSize: "15px",
      }}
    >
      {receiverId ? (
        onlineUsers.includes(receiverId) ? (
          <span style={{ color: "green" }}>🟢 Online</span>
        ) : (
          <span style={{ color: "gray" }}>⚪ Offline</span>
        )
      ) : (
        <span style={{ color: "#666" }}>
          Enter Receiver ID to check status
        </span>
      )}
    </div>

    {!user && (
      <div
        style={{
          padding: "10px",
          background: "#fee2e2",
          color: "#b91c1c",
          marginBottom: "15px",
          borderRadius: "5px",
        }}
      >
        You must be logged in for messages to save to MongoDB!
      </div>
    )}

    <input
      type="text"
      placeholder="Enter Receiver's User ID..."
      value={receiverId}
      onChange={(e) => setReceiverId(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        boxSizing: "border-box",
      }}
    />

    <div
      style={{
        height: "350px",
        overflowY: "auto",
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "20px",
        background: "#fafafa",
        borderRadius: "10px",
      }}
    >
      {typing && (
        <div
          style={{
            color: "#666",
            fontStyle: "italic",
            marginBottom: "10px",
            paddingLeft: "5px",
          }}
        >
          ✍️ Typing...
        </div>
      )}

      {messages.map((msg, index) => {
        const senderId =
          typeof msg.sender === "object"
            ? msg.sender?._id
            : msg.sender;

        const isMe = senderId === user?._id;

        const senderName =
          typeof msg.sender === "object"
            ? msg.sender?.fullName
            : msg.sender;

        return (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              display: "flex",
              justifyContent: isMe ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "12px",
                borderRadius: "12px",
                background: isMe ? "#DCF8C6" : "#F3F4F6",
              }}
            >
              <strong>{isMe ? "You" : senderName}</strong>

              {isMe && (
                <button
                  onClick={() => deleteMessage(msg._id)}
                  style={{
                    marginLeft: "10px",
                    background: "transparent",
                    border: "none",
                    color: "#ef4444",
                    cursor: "pointer",
                    fontSize: "12px",
                    float: "right",
                  }}
                >
                  🗑️
                </button>
              )}

              <div
                style={{
                  marginTop: "6px",
                  marginBottom: "6px",
                }}
              >
                {msg.text}
              </div>

             <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "6px",
    gap: "10px",
  }}
>
  <small
    style={{
      color: "#666",
      fontSize: "11px",
    }}
  >
    {formatTime(msg.createdAt)}
  </small>

  {isMe && (
    <small
      style={{
        color: msg.seen ? "#2563eb" : "#666",
        fontSize: "11px",
        fontWeight: "bold",
      }}
    >
      {msg.seen ? "✓✓ Seen" : "✓ Sent"}
    </small>
  )}
</div>
            </div>
          </div>
        );
      })}

      <div ref={messagesEndRef}></div>
    </div>

    <div
      style={{
        display: "flex",
        gap: "10px",
      }}
    >
      <input
        type="text"
        placeholder="Type message..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);

          if (!receiverId || !user) return;

          socket.emit("typing", {
            sender: user._id,
            receiver: receiverId,
          });

          clearTimeout(typingTimeout.current);

          typingTimeout.current = setTimeout(() => {
            socket.emit("stopTyping", {
              sender: user._id,
              receiver: receiverId,
            });
          }, 1000);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        style={{
          flex: 1,
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding: "10px 20px",
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
);}

export default Chat;
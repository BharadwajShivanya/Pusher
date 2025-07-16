const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "2022663",
  key: process.env.PUSHER_KEY || "0772e0e26ef6881f31ee",
  secret: process.env.PUSHER_SECRET || "b78e451891ab310d49c6",
  cluster: "ap2",
  useTLS: true
});

// Root route (for sanity check)
app.get("/", (req, res) => {
  res.send("✅ ALDO Backend is live and healthy!");
});

// Message sending route
app.post("/send", (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: "Username and message required." });
  }

  pusher.trigger("my-channel", "my-event", {
    username,
    message
  });

  console.log(`📨 ${username}: ${message}`);
  res.status(200).json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server live at http://localhost:${PORT}`);
});

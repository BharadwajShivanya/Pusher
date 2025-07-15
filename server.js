
const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");

const app = express();
app.use(cors());
app.use(express.json());

const pusher = new Pusher({
  appId: "2022663",
  key: "0772e0e26ef6881f31ee",
  secret: "b78e451891ab310d49c6", // <- Replace with your real secret
  cluster: "ap2",
  useTLS: true
});

app.post("/send", (req, res) => {
  const message = req.body.message;
  pusher.trigger("my-channel", "my-event", { message });
  res.send({ success: true });
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});

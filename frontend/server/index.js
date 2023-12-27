// server/server.js

const http = require("http");
const server = http.createServer((req, res) => {
  // Handle HTTP requests if needed
});

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  io.emit("user", socket.id);

  socket.on("chat message", (content) => {
    const message = { userId: socket.id, content: content };
    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

server.listen(3335, () => {
  console.log("WebSocket server listening on port 3334");
});

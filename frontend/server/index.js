// server/server.js
const http = require("http");
const server = http.createServer((req, res) => {
  // Handle HTTP requests if needed
});

// const { Server } = require("socket.io");
// const io = new Server(server);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*", // 클라이언트의 주소로 변경
    // origin: "http://10.19.239.198:3333", // 클라이언트의 주소로 변경
    // origin: ["http://localhost:3333", "*"], // 클라이언트의 주소로 변경
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle chat messages
  socket.on("chat message", (message) => {
    console.log(socket.id, "message: " + message);
    io.emit("chat message", message); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3334, () => {
  console.log("WebSocket server listening on port 3334");
});

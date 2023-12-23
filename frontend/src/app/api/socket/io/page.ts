import { Server as NetServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { Socket } from "net";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const myPath = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: myPath,
      addTrailingSlash: false,
      cors: {
        origin: "http://localhost:3333",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("A user connected");

      // Handle chat messages
      socket.on("chat message", (message) => {
        io.emit("chat message", message); // Broadcast the message to all connected clients
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });
  }
};

export default ioHandler;

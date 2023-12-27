"use client";

import path from "path";
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

interface ConnectInfo {
  sender: number; // mystate id
  receiver: string; // receiver nickname
}

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("disconnect", async () => {
      setIsConnected(false);
    });
  }, []);

  useEffect(() => {
    // const socketInstance = io(`${process.env.NEXT_PUBLIC_SITE_URL}`);
    const socketInstance = io(
      `http://10.19.239.198:${process.env.NEXT_PUBLIC_PORT}/dm`,
      {
        // path: "/dm",
        // transports: ["websocket"],
      },
    );
    // const socketInstance = io("http://localhost:3334");

    socketInstance.on("connect", async () => {
      setIsConnected(true);
      const connectInfo: ConnectInfo = {
        sender: 1,
        receiver: "yeomin",
      };

      socketInstance.emit("join", connectInfo);
    });

    setSocket(socketInstance);
    return () => {
      // console.log("disconnect");
      // socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

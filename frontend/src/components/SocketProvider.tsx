"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

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
  }, [socket]);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      // process.env.NEXT_PUBLIC_SITE_URL,
      "http://localhost:3334",
      {
        // path: "/api/socket/io",
        addTrailingSlash: false,
        // transports: ["websocket"],
        // cors: {
        //   origin: "*",
        //   methods: ["GET", "POST"],
        //   credentials: true,
        // },
      },
    );

    socketInstance.on("connect", async () => {
      setIsConnected(true);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

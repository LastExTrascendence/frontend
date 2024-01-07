"use client";

import { getCookie } from "@/api/cookie/cookies";
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
    const socketInstance = io(
      `http://${process.env.FE_DOMAIN}:${process.env.NEXT_PUBLIC_DM_PORT}/dm`,
      {
        auth: {
          token: `Bearer ${getCookie("access_token")}`,
        },
      },
    );

    socketInstance.on("connect", async () => {
      setIsConnected(true);
    });

    setSocket(socketInstance);
    return () => {
      console.log("disconnect");
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

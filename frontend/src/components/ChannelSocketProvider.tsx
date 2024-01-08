"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import io from "socket.io-client";
import { getCookie } from "@/api/cookie/cookies";

type ChannelSocketContextType = {
  channelSocket: any | null;
  isChannelConnected: boolean;
};

const ChannelSocketContext = createContext<ChannelSocketContextType>({
  channelSocket: null,
  isChannelConnected: false,
});

export const useChannelSocket = () => useContext(ChannelSocketContext);

export default function ChannelSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [channelSocket, setChannelSocket] = useState<any | null>(null);
  const [isChannelConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!channelSocket) {
      return;
    }

    channelSocket.on("disconnect", async () => {
      setIsConnected(false);
    });
  }, []);

  useEffect(() => {
    const token = getCookie("access_token") ?? null;
    const socketInstance = io(
      `http://${process.env.FE_DOMAIN}:${process.env.NEXT_PUBLIC_CHANNEL_PORT}/chat`,
      {
        auth: {
          token: `Bearer ${token}`,
        },
      },
    );

    socketInstance.on("connect", async () => {
      setIsConnected(true);
    });

    setChannelSocket(socketInstance);
    return () => {
      console.log("disconnect");
      socketInstance.disconnect();
    };
  }, []);

  const contextValue = useMemo(
    () => ({ channelSocket, isChannelConnected }),
    [channelSocket, isChannelConnected],
  );

  return (
    <ChannelSocketContext.Provider value={contextValue}>
      {children}
    </ChannelSocketContext.Provider>
  );
}

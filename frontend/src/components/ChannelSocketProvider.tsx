"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import io from "socket.io-client";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";
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
  const myInfo = useRecoilValue(myState);

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

    console.log(token);

    const socketInstance = io(
      `http://10.19.239.198:${process.env.NEXT_PUBLIC_CHANNEL_PORT}/chat?token=${token}`,
      {
        auth: {
          token: `Bearer ${token}`, // 인증 토큰을 auth 객체에 추가
        },
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${token}`, // 헤더에 인증 토큰 추가
            },
          },
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

"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import { myState } from "@/recoil/atom";
import { ChannelSocketContextType } from "@/types/type/channel-socket.type";
import { getCookie } from "@/api/cookie/cookies";

const ChannelSocketContext = createContext<ChannelSocketContextType>({
  channelSocket: null,
  isChannelConnected: false,
  setChannelId: () => {},
  setUserId: () => {},
});

export const useChannelSocket = () => useContext(ChannelSocketContext);

export default function ChannelSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [channelId, setChannelId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [channelSocket, setChannelSocket] = useState<any | null>(null);
  const [isChannelConnected, setIsConnected] = useState(false);
  const myInfo = useRecoilValue(myState);
  const router = useRouter();

  useEffect(() => {
    if (!channelSocket) {
      return;
    }

    channelSocket.on("disconnect", async () => {
      setIsConnected(false);
      await router.replace("/channel");
    });
  }, [channelSocket]);

  useEffect(() => {
    const token = getCookie("access_token") ?? null;
    const socketInstance = io(
      `http://${process.env.FE_DOMAIN}:${process.env.NEXT_PUBLIC_CHANNEL_PORT}/chat`,
      {
        auth: {
          token: `Bearer ${token}`,
          user: {
            id: `${myInfo.id}`,
            nickname: `${myInfo.nickname}`,
          },
        },
      },
    );

    socketInstance.on("connect", async () => {
      setIsConnected(true);
    });

    setChannelSocket(socketInstance);
    return () => {
      socketInstance.emit("leaveChannel", {
        channelId,
        userId,
      });

      socketInstance.off("connect");
      socketInstance.off("disconnect");
      socketInstance.disconnect();
    };
  }, [channelId, userId]);

  const contextValue = useMemo(
    () => ({
      channelSocket,
      isChannelConnected,
      setChannelId,
      setUserId,
    }),
    [channelSocket, isChannelConnected],
  );

  return (
    <ChannelSocketContext.Provider value={contextValue}>
      {children}
    </ChannelSocketContext.Provider>
  );
}

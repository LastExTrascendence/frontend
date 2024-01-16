"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { getCookie } from "@/api/cookie/cookies";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";

interface ConnectInfo {
  sender: number; // mystate id
  receiver: string; // receiver nickname
}

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
  enterQueue: () => void;
  exitQueue: () => void;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  enterQueue: () => { },
  exitQueue: () => { }
});

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const myInfo = useRecoilValue(myState);
  const router = useRouter();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("disconnect", async () => {
      setIsConnected(false);
    });
  }, []);

  useEffect(() => {
    const token = getCookie("access_token") ?? null;
    const socketInstance = io(
      `http://${process.env.FE_DOMAIN}:${process.env.NEXT_PUBLIC_USER_PORT}/user`,
      {
        auth: {
          token: `Bearer ${token}`,
        },
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

  const enterQueue = () => {
    if (socket) {
      console.log("enterQueue", myInfo);
      socket.emit("enterQueue", { userId: myInfo.id });
    }
  };

  const exitQueue = () => {
    if (socket) {
      console.log("exitQueue", myInfo);
      socket.emit("exitQueue", { userId: myInfo.id });
    }
  };

  // queue connect handler
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("gameMatch", async ({ gameId, title }: { gameId: string, title: string }) => {
      await router.replace(`/game/${gameId}?name=${title}`);
    });

    return () => {
      socket.off("gameMatch");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, enterQueue, exitQueue }}>
      {children}
    </SocketContext.Provider>
  );
}

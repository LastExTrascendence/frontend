"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import io from "socket.io-client";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";
import { getCookie } from "@/api/cookie/cookies";

type GameSocketContextType = {
  gameSocket: any | null;
  isGameConnected: boolean;
};

const GameSocketContext = createContext<GameSocketContextType>({
  gameSocket: null,
  isGameConnected: false,
});

export const useGameSocket = () => useContext(GameSocketContext);

export default function GameSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gameSocket, setGameSocket] = useState<any | null>(null);
  const [isGameConnected, setGameIsConnected] = useState(false);
  const myInfo = useRecoilValue(myState);

  useEffect(() => {
    if (!gameSocket) {
      return;
    }

    gameSocket.on("disconnect", async () => {
      setGameIsConnected(false);
    });
  }, []);

  useEffect(() => {
    const token = getCookie("access_token") ?? null;

    console.log(token);

    const socketInstance = io(
      `http://10.19.239.198:${process.env.NEXT_PUBLIC_GAME_PORT}/game?token=${token}`,
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
      setGameIsConnected(true);
    });

    setGameSocket(socketInstance);
    return () => {
      console.log("disconnect");
      socketInstance.disconnect();
    };
  }, []);

  const contextValue = useMemo(
    () => ({ gameSocket, isGameConnected }),
    [gameSocket, isGameConnected],
  );

  return (
    <GameSocketContext.Provider value={contextValue}>
      {children}
    </GameSocketContext.Provider>
  );
}

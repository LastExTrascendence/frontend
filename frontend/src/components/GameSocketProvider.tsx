"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import { myState } from "@/recoil/atom";
import { GameSocketContextType } from "@/types/type/game-socket.type";
import { getCookie } from "@/api/cookie/cookies";

const GameSocketContext = createContext<GameSocketContextType>({
  gameSocket: null,
  isGameConnected: false,
  setGameId: () => { },
  setUserId: () => { },
});

export const useGameSocket = () => useContext(GameSocketContext);

export default function GameSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gameId, setGameId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [gameSocket, setGameSocket] = useState<any | null>(null);
  const [isGameConnected, setGameIsConnected] = useState(false);
  const myInfo = useRecoilValue(myState);
  const router = useRouter();

  useEffect(() => {
    if (!gameSocket) {
      return;
    }

    gameSocket.on("disconnect", async () => {
      setGameIsConnected(false);
      router.replace("/game");
    });

    return () => {
      gameSocket.off("disconnect");
    }
  }, [gameSocket]);

  useEffect(() => {
    const token = getCookie("access_token") ?? null;
    const socketInstance = io(
      `http://${process.env.FE_DOMAIN}:${process.env.NEXT_PUBLIC_GAME_PORT}/game`,
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
      setGameIsConnected(true);
    });

    setGameSocket(socketInstance);
    return () => {
      socketInstance.emit("leaveGame", {
        gameId,
        userId,
      });

      socketInstance.off("connect");
      socketInstance.disconnect();
    };
  }, [gameId, userId]);

  const contextValue = useMemo(
    () => ({ gameSocket, isGameConnected, setGameId, setUserId }),
    [gameSocket, isGameConnected],
  );

  return (
    <GameSocketContext.Provider value={contextValue}>
      {children}
    </GameSocketContext.Provider>
  );
}

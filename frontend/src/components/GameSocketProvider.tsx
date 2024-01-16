"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { getCookie } from "@/api/cookie/cookies";
import { GameSocketContextType } from "@/types/type/game-socket.type";

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
  const router = useRouter();

  useEffect(() => {
    if (!gameSocket) {
      return;
    }

    gameSocket.on("disconnect", async () => {
      setGameIsConnected(false);
      // await router.replace("/game");
    });
  }, [gameSocket]);

  useEffect(() => {
    const token = getCookie("access_token") ?? null;
    const socketInstance = io(
      `http://${process.env.FE_DOMAIN}:${process.env.NEXT_PUBLIC_GAME_PORT}/game`,
      {
        auth: {
          token: `Bearer ${token}`,
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
      console.log("leave game", gameId, userId);

      socketInstance.off("connect");
      socketInstance.off("disconnect");
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

"use client";

import { useEffect } from "react";
import { GameChannelListDto } from "@/types/interface/game.interface";

export default function useGameInfoListner(
  gameSocket: any,
  isGameConnected,
  setGameInfo,
) {
  useEffect(() => {
    if (!gameSocket) return;
    if (isGameConnected) {
      gameSocket.on("gameInfo", (data: GameChannelListDto) => {
        console.log(data);
        setGameInfo(data);
      });
    }
  }, [gameSocket, isGameConnected]);
}

"use client";

import { useEffect } from "react";

export default function useGameEnter(
  gameSocket: any,
  isGameConnected,
  myId: number,
  name: string,
) {
  useEffect(() => {
    if (!gameSocket) return;
    if (isGameConnected) {
      gameSocket.emit("enter", { userId: myId, title: name });
    }
  }, [isGameConnected, name]);
}

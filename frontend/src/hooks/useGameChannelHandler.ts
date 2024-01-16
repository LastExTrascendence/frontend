"use client";

import { Dispatch, useEffect } from "react";

export default function useChannelHandler(
  myId,
  gameId,
  setUserId: Dispatch<React.SetStateAction<number>>,
  setGameId: Dispatch<React.SetStateAction<number>>,
) {
  useEffect(() => {
    if (myId) {
      setUserId(myId);
    }

    if (gameId) {
      setGameId(Number(gameId));
    }
  }, [myId, gameId, setUserId, setGameId]);
}

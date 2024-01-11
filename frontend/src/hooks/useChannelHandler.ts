"use client";

import { Dispatch, useEffect } from "react";

export default function useChannelHandler(
  myId,
  channelId,
  setUserId: Dispatch<React.SetStateAction<number>>,
  setChannelId: Dispatch<React.SetStateAction<number>>,
) {
  useEffect(() => {
    if (myId) {
      setUserId(myId);
    }

    if (channelId) {
      setChannelId(Number(channelId));
    }
  }, [myId, channelId, setUserId, setChannelId]);
}

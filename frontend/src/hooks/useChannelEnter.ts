"use client";

import { useEffect } from "react";

export default function useChannelEnter(
  channelSocket: any,
  isChannelConnected,
  myId: number,
  name: string,
) {
  useEffect(() => {
    if (!channelSocket) return;
    if (isChannelConnected) {
      channelSocket.emit("enter", { userId: myId, title: name });
    }
  }, [isChannelConnected, name]);
}

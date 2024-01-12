"use client";

import { useEffect } from "react";
import { Message } from "@/types/interface/chat.interface";

export const useChannelListener = (channelSocket, setMessages) => {
  useEffect(() => {
    if (!channelSocket) return;

    const messageListener = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    channelSocket.on("msgToClient", messageListener);

    return () => {
      channelSocket.off("msgToClient", messageListener);
    };
  }, [channelSocket, setMessages]);
};

export default useChannelListener;

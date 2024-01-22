"use client";

import { useEffect } from "react";

export default function useDMListener(socket, setMessages) {
  useEffect(() => {
    if (!socket) {
      return;
    }

    const messageListener = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("msgToClient", messageListener);

    return () => {
      socket.off("msgToClient", messageListener);
    };
  }, [socket]);
}
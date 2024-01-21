"use client";

import { useEffect } from "react";

export default function useGetRedis(socket, beforeUserNick, sender, receiver) {
  useEffect(() => {
    if (!socket) return;
    socket.emit("getRedis", { beforeUserNick, sender, receiver });
  }, [socket, sender, receiver]);
}
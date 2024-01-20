"use client";

import { useEffect } from "react";
import { UserFriendListResponseDto } from "@/types/dto/user.dto";

export default function useFriendStatusListner({ socket, isConnected, friendsList, setFriendsList }) {
  useEffect(() => {
    if (!socket) return;
    console.log("socket =====> ", friendsList);
    socket.on("friendStatus", (data: UserFriendListResponseDto) => {
      setFriendsList(data);
    });

    return () => {
      socket.off("friendStatus");
    };
  }, [socket, isConnected]);
}

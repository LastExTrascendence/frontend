"use client";

import { useEffect } from "react";
import { UserFriendListResponseDto } from "@/types/dto/user.dto";
import { UserInfoDto } from "@/types/interface/user.interface";

export default function useFriendStatusListner({ socket, friendsList, setFriendsList }: { socket: any, friendsList: UserFriendListResponseDto, setFriendsList: any }) {

  useEffect(() => {
    if (!socket) return;
    if (!friendsList) return;

    socket.on("followingStatus", (data: UserInfoDto) => {
      if (!data) return;

      const newFriendsList = friendsList.map((friend: { id: number; }) => {
        if (friend.id === data.id) {
          return data;
        }
        return friend;
      });

      setFriendsList(newFriendsList);
    });

    return () => {
      socket.off("followingStatus");
    };
  }, [socket, friendsList, setFriendsList]);
}

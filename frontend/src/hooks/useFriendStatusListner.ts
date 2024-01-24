"use client";

import { useEffect } from "react";
import { UserFriendListResponseDto } from "@/types/dto/user.dto";
import { UserInfoDto } from "@/types/interface/user.interface";
import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";

export default function useFriendStatusListner({ socket, friendsList, setFriendsList }: { socket: any, friendsList: UserFriendListResponseDto, setFriendsList: any }) {

  useEffect(() => {
    if (!socket) return;
    if (friendsList === undefined && friendsList === STATUS_400_BAD_REQUEST) return;

    socket.on("followingStatus", (data: UserInfoDto) => {
      if (!data || friendsList === STATUS_400_BAD_REQUEST) return;

      const newFriendsList = friendsList?.map((friend: { id: number; }) => {
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

"use client";

import { useEffect } from "react";
import { ChatAttendees } from "@/types/interface/chat.interface";

export const useUserListListener = (channelSocket, setUserList) => {
  useEffect(() => {
    if (!channelSocket) return;

    const userListListener = (userListData: ChatAttendees[]) => {
      setUserList(userListData);
    };

    channelSocket.on("userList", userListListener);

    return () => {
      channelSocket.off("userList", userListListener);
    };
  }, [channelSocket]);
};

export default useUserListListener;

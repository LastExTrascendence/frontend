"use client";

import { useEffect } from "react";
import { ChatAttendees } from "@/types/interface/chat.interface";

export default function useUserListComposer(
  userList: ChatAttendees[],
  myNickname: string,
  setMyRole,
) {
  useEffect(() => {
    if (!userList || !myNickname) return;
    const matchingUser = userList.find((user) => user.nickname === myNickname);

    if (matchingUser) {
      setMyRole(matchingUser.role);
    } else {
      setMyRole("USER");
    }
  }, [userList]);
}

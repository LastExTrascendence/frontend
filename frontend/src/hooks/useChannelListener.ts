"use client";

import { useEffect } from "react";
import { Message, ChatAttendees } from "@/types/interface/chat.interface";

export const useChannelListener = (
  channelSocket,
  setMessages,
  setUserList,
  myInfo,
  name,
) => {
  useEffect(() => {
    if (!channelSocket) return;

    const messageListener = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const userListListener = (userListData: ChatAttendees[]) => {
      setUserList(userListData);
    };

    channelSocket.on("msgToClient", messageListener);
    channelSocket.on("userList", userListListener);
    channelSocket.emit("enter", { userId: myInfo.id, title: name });

    return () => {
      channelSocket.off("msgToClient", messageListener);
      channelSocket.off("userList", userListListener);
    };
  }, [channelSocket, setMessages, setUserList, myInfo, name]);
};

export default useChannelListener;

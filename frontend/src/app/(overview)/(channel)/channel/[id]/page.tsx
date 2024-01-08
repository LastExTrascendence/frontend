"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";

import useChannelListener from "@/hooks/useChannelListener";
import { useChannelSocket } from "@/components/ChannelSocketProvider";
import { Message, ChatAttendees } from "@/types/interface/chat.interface";
import getAdminIcon from "@/ui/overview/channel/get-admin-icon";
import getRoleIcon from "@/ui/overview/channel/get-role-icon";
import MessageItem from "@/ui/overview/channel/message-item";
import MessageInput from "@/ui/overview/channel/message-input";
import GrowBlank from "@/ui/grow-blank";
import { UserDto } from "@/types/interface/user.interface";

export function changeRole(
  socket: any,
  title: string,
  myInfo: UserDto,
  user: string,
) {
  console.log("change role");
  socket.emit("changeRole", { title, userId: myInfo.id, channelId: user });
}

export function kickUser(
  socket: any,
  title: string,
  myInfo: UserDto,
  user: string,
) {
  console.log("kick user");
  socket.emit("kickUser", { title, userId: myInfo.id, kickId: user });
}

export function banUser(
  socket: any,
  title: string,
  myInfo: UserDto,
  user: string,
) {
  console.log("ban user");
  socket.emit("banUser", { title, userId: myInfo.id, banId: user });
}

export function muteUser(
  socket: any,
  title: string,
  myInfo: UserDto,
  user: string,
) {
  console.log("mute user");
  socket.emit("muteUser", {
    title,
    userId: myInfo.id,
    muteId: user,
  });
}

export default function Page({ params }: { params: { id: string } }) {
  const myInfo = useRecoilValue(myState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { channelSocket, isConnected } = useChannelSocket();
  const [userList, setUserList] = useState<ChatAttendees[]>();
  const [myRole, setMyRole] = useState<string>("USER");
  const messagesEndRef = useRef(null);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log("user", userList);

    if (!userList) {
      setMyRole("USER");
      return;
    }

    const matchingUser = userList.find(
      (user) => user.nickname === myInfo.nickname,
    );

    if (matchingUser) {
      setMyRole(matchingUser.role);
    } else {
      setMyRole("USER");
    }
  }, [userList, myInfo.nickname]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  useChannelListener(channelSocket, setMessages, setUserList, myInfo, name);

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      channelSocket.emit("msgToServer", {
        time: new Date(),
        title: name,
        sender: myInfo.id,
        content: currentMessage,
      });
      setCurrentMessage("");
    }
  };

  return (
    <div className="m-12 flex max-h-[1833px] min-h-[400px] w-full min-w-[400px] flex-row content-center items-start">
      <div className="flex h-full w-full flex-col bg-chatColor p-9">
        <div className="content-start items-center overflow-y-scroll">
          {messages.map((message, index) => (
            <MessageItem key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <GrowBlank />
        <MessageInput
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
          handleKeyDown={handleKeyDown}
          sendMessage={sendMessage}
          name={name}
        />
      </div>

      <div className="hidden h-full min-w-[300px] max-w-[350px] flex-col overflow-y-scroll bg-userInfoColor p-9 md:block">
        <div className="font-['Noto Sans KR'] text-4xl font-normal text-white">
          #{name}
        </div>
        <div className="mt-10 flex flex-col space-y-4">
          {userList &&
            userList.map((user) => (
              <div key={user.id} className="flex items-center space-x-4">
                <Image
                  className={
                    user.role === "CREATOR"
                      ? "h-[35.57px] w-[35.57px] rounded-[32px] border-4 border-indigoColor"
                      : "rounded-full border border-black"
                  }
                  width={36}
                  height={36}
                  // src={user.avatar}
                  src="/default_profile.svg"
                  alt={user.nickname}
                />

                {getRoleIcon(user.role)}

                <span className="font-['Noto Sans KR'] text-base font-normal text-white">
                  {user.nickname}
                </span>

                {myInfo.nickname !== user.nickname
                  ? getAdminIcon(myRole, channelSocket, myInfo, user.nickname)
                  : null}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

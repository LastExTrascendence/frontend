"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

import React, { useState, useEffect, useRef, use } from "react";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";

import { Message, ChatAttendees } from "@/types/interface/chat.interface";
import { useChannelSocket } from "@/components/ChannelSocketProvider";
import useChannelListener from "@/hooks/useChannelListener";
import useUserListListener from "@/hooks/useUserListListener";
import useUserListComposer from "@/hooks/useUserListComposer";
import useChannelHandler from "@/hooks/useChannelHandler";
import useChannelEnter from "@/hooks/useChannelEnter";

import getAdminIcon from "@/ui/overview/channel/get-admin-icon";
import GetRoleIcon from "@/ui/overview/channel/get-role-icon";
import MessageItem from "@/ui/overview/channel/message-item";
import MessageInput from "@/ui/overview/channel/message-input";
import GrowBlank from "@/ui/grow-blank";
import changeRole from "@/api/socket/chat/changeRole";

export default function Page({ params }: { params: { id: string } }) {
  const myInfo = useRecoilValue(myState);
  const [messages, setMessages] = useState<Message[]>([]);
  const { channelSocket, isChannelConnected, setChannelId, setUserId } =
    useChannelSocket();

  const [currentMessage, setCurrentMessage] = useState("");
  const [userList, setUserList] = useState<ChatAttendees[]>();
  const [myRole, setMyRole] = useState<string>("USER");
  const messagesEndRef = useRef(null);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const messageRef = useRef("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  useChannelHandler(myInfo.id, params.id, setUserId, setChannelId);
  useChannelEnter(channelSocket, isChannelConnected, myInfo.id, name);
  useChannelListener(channelSocket, setMessages);
  useUserListListener(channelSocket, setUserList);
  useUserListComposer(userList, myInfo.nickname, setMyRole);

  // useChannelListener(channelSocket, setMessages, setUserList, myInfo, name);

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
          // messageRef={messageRef}
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
                  alt={user.nickname || ""}
                />

                <GetRoleIcon
                  myRole={myRole}
                  userRole={user.role}
                  changeRole={() =>
                    changeRole(channelSocket, name, myInfo.id, user.nickname)
                  }
                />

                <span className="font-['Noto Sans KR'] text-base font-normal text-white">
                  {user.nickname}
                </span>

                {myInfo.nickname !== user.nickname &&
                  getAdminIcon({
                    role: myRole,
                    socket: channelSocket,
                    title: name,
                    myId: myInfo.id,
                    user: user,
                  })}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

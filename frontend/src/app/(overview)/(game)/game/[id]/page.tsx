"use client";

import React, { useState, useEffect, useRef } from "react";
import { useGameSocket } from "@/components/GameSocketProvider";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// channel 입장시 받아야할 정보
// 1. 채널 주인 / 관리자
// 2. 채널 멤버

// TODO
// 컴포넌트 분리

interface Message {
  time: string | Date;
  sender: string;
  content: string;
}

interface User {
  id: number;
  nickname: string;
  avatar: string;
  role: string;
  mute: boolean;
}

const mockUser = [
  {
    id: 1,
    nickname: "misukim",
    avatar: "https://via.placeholder.com/36x36",
  },
  {
    id: 2,
    nickname: "chanheki",
    avatar: "https://via.placeholder.com/36x36",
  },
];

const getRoleIcon = (role: string) => {
  switch (role) {
    case "CREATOR":
      return <Image src="/creator.svg" alt="Creator" width={18} height={18} />;
    case "OPERATOR":
      return (
        <Image src="/operator.svg" alt="Operator" width={18} height={18} />
      );
    default:
      return <div style={{ width: "18px", height: "18px" }} />;
  }
};

const getAdminIcon = (role: string) => {
  switch (role) {
    case "CREATOR":
      return (
        <div className="ml-auto flex bg-red-800">
          <button
            type="button"
            className="p-1"
            onClick={() => handleApiRequest("user-mute")}
          >
            <Image
              src="/user-mute.svg"
              alt="User Mute"
              width={18}
              height={18}
            />
          </button>
          <button
            type="button"
            className="p-1"
            onClick={() => handleApiRequest("user-kick")}
          >
            <Image
              src="/user-kick.svg"
              alt="User Kick"
              width={18}
              height={18}
            />
          </button>
          <button type="button" onClick={() => handleApiRequest("user-block")}>
            <Image
              src="/user-block.svg"
              alt="User Block"
              width={18}
              height={18}
            />
          </button>
        </div>
      );

    case "OPERATOR":
      return (
        <div className="ml-auto">
          <Image src="/operator.svg" alt="Operator" width={18} height={18} />
        </div>
      );

    case "USER":
    default:
      return null;
  }
};

export default function Page({ params }: { params: { id: string } }) {
  const myInfo = useRecoilValue(myState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { channelSocket, isConnected } = useGameSocket();
  const [userList, setUserList] = useState<User[]>();
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
  }, [userList]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  useEffect(() => {
    if (!channelSocket) {
      return;
    }

    const messageListener = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    channelSocket.on("msgToClient", messageListener);

    channelSocket.emit("enter", myInfo);

    channelSocket.on("userList", (userListData) => {
      setUserList(userListData);
    });

    // 클린업 함수
    return () => {
      channelSocket.off("msgToClient", messageListener);
    };
  }, [channelSocket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      channelSocket.emit("msgToServer", {
        time: new Date(),
        sender: myInfo.id,
        content: currentMessage,
      });
      setCurrentMessage("");
    }
  };

  return (
    <div className="m-12 flex max-h-[1833px] min-h-[400px] w-full min-w-[400px] flex-row content-center items-start">
      <div className="flex h-full flex-col bg-chatColor p-9">
        <div className="content-start items-center overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className="grid grid-cols-[auto_auto_1fr] gap-4 rounded-lg px-2 pb-1 text-base text-white hover:bg-gray-700"
            >
              <span className="max-w-[100px] overflow-hidden">
                {message.time}
              </span>
              <span className="max-w-[100px] overflow-hidden">
                {message.sender}
              </span>
              <span>{message.content}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="my-2 w-full grow" />

        <div className="bg-chatInputColor flex min-h-[35px] w-full rounded-md shadow-sm">
          <input
            className="placeholder:text-muted-foreground focus-visible:ring-ring border-input focus-visible:false flex-1 rounded-md rounded-l-md bg-transparent p-2 text-sm text-white shadow-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder={`Send message to ${name}`}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 rounded-r-md text-sm text-white transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            onClick={(e) => sendMessage(e)}
          >
            <Image src="/send.svg" alt="SendButton" width={30} height={30} />
          </button>
        </div>
      </div>

      <div className="flex h-full flex-col bg-userInfoColor p-9">
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
                      ? "border-indigoColor h-[35.57px] w-[35.57px] rounded-[32px] border-4"
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
                  ? getAdminIcon(myRole)
                  : null}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "@/components/SocketProvider";
import { useRecoilValue } from "recoil";
import { myState } from "@/utils/myState";
import Image from "next/image";
import showTime from "@/utils/showTime";
import { useSearchParams } from "next/navigation";

// channel 입장시 받아야할 정보
// 1. 채널 주인 / 관리자
// 2. 채널 멤버
// 3. 채널 메세지

// TODO
// 컴포넌트 분리

interface Message {
  time: string;
  sender: number; // mystate id
  receiver: string; // receiver nickname
  content: string; //
}

const mockUser = [
  {
    id: 1,
    nickname: "jusohn",
    avatar: "https://via.placeholder.com/36x36",
  },
  {
    id: 2,
    nickname: "TestNickName",
    avatar: "https://via.placeholder.com/36x36",
  },
  {
    id: 3,
    nickname: "chanheki",
    avatar: "https://via.placeholder.com/36x36",
  },
  {
    id: 4,
    nickname: "yeomin",
    avatar: "https://via.placeholder.com/36x36",
  },
  {
    id: 5,
    nickname: "randomUser42",
    avatar: "https://via.placeholder.com/36x36",
  },
];

const initialMessages = [
  {
    time: "1:21 PM",
    sender: "chanheki",
    receiver: 2,
    content: "안녕하세요",
  },
  {
    time: "1:21 PM",
    sender: "chanheki",
    receiver: 2,
    content: "반갑습니다",
  },
  {
    time: "1:22 PM",
    sender: "yeomin",
    receiver: 2,
    content:
      "반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다",
  },
  {
    time: "1:22 PM",
    sender: "yeomin",
    receiver: 2,
    content: "ㅇㅇㄴㅇㄹ",
  },
  {
    time: "1:22 PM",
    sender: "testNickName",
    receiver: 2,
    content:
      "반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다",
  },
  {
    time: "1:21 PM",
    sender: "chanheki",
    receiver: 2,
    content: "반갑습니다",
  },
  {
    time: "1:22 PM",
    sender: "yeomin",
    receiver: 2,
    content:
      "반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다",
  },
  {
    time: "1:22 PM",
    sender: "yeomin",
    receiver: 2,
    content: "ㅇㅇㄴㅇㄹ",
  },
  {
    time: "1:22 PM",
    sender: "testNickName",
    receiver: 2,
    content:
      "반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다",
  },
  {
    time: "1:21 PM",
    sender: "chanheki",
    receiver: 2,
    content: "반갑습니다",
  },
  {
    time: "1:22 PM",
    sender: "yeomin",
    receiver: 2,
    content:
      "반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다",
  },
  {
    time: "1:22 PM",
    sender: "yeomin",
    receiver: 2,
    content: "ㅇㅇㄴㅇㄹ",
  },
  {
    time: "1:22 PM",
    sender: "testNickName",
    receiver: 2,
    content:
      "반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다",
  },
  {
    time: "1:21 PM",
    sender: "chanheki",
    receiver: 2,
    content: "반갑습니다",
  },
  {
    time: "1:22 PM",
    sender: "yeomin",
    receiver: 2,
    content:
      "반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다",
  },
  {
    time: "1:22 PM",
    sender: "yeomin",
    receiver: 2,
    content: "ㅇㅇㄴㅇㄹ",
  },
  {
    time: "1:22 PM",
    sender: "testNickName",
    receiver: 2,
    content:
      "반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다",
  },
];

export default function Page({ params }: { params: { id: string } }) {
  const myInfo = useRecoilValue(myState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { socket, isConnected } = useSocket();
  const messagesEndRef = useRef(null);
  const [mockMessage, setMockMessage] = useState(initialMessages);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mockMessage]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentMessage.trim()) {
        setMockMessage([
          ...mockMessage,
          {
            time: showTime(new Date()),
            sender: myInfo.nickname,
            content: currentMessage,
          },
        ]);
        setCurrentMessage("");
      }
    }
  };

  useEffect(() => {
    if (!socket) {
      return;
    }

    const messageListener = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("msgToClient", messageListener);

    socket.emit("getChatRedis", { id: params.id });

    // 클린업 함수
    return () => {
      socket.off("msgToClient", messageListener);
    };
  }, [socket]);

  // const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   const messsage: Message = {
  //     sender: myInfo.id,
  //     receiver: params.id,
  //     content: currentMessage,
  //   };

  //   socket.emit("msgToChat", messsage);
  //   setCurrentMessage("");
  // };

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      setMockMessage([
        ...mockMessage,
        {
          time: showTime(new Date()),
          sender: myInfo.nickname,
          content: currentMessage,
        },
      ]);
      setCurrentMessage("");
    }
  };

  return (
    <div className="m-12 flex max-h-[1833px] min-h-[400px] w-full min-w-[400px] flex-row content-center items-start">
      <div className="flex h-full flex-col bg-chatColor p-9">
        {/* {messages.map((message, index) => ( */}
        <div className="content-start items-center overflow-y-auto">
          {mockMessage.map((message, index) => (
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
        <div className="font-['Noto Sans KR'] mt-4 text-base font-normal text-white">
          Online (4/5)
        </div>
        <div className="mt-10 flex flex-col space-y-4">
          {mockUser.map((user, index) => (
            <div key={user.id} className="flex items-center space-x-4">
              <img
                className="h-9 w-9 rounded-full border border-black"
                src={user.avatar}
                alt={user.nickname}
              />
              <span className="font-['Noto Sans KR'] text-base font-normal text-white">
                {user.nickname}
              </span>
              <div className="h-3 w-3 rounded-full bg-green-500" />{" "}
              {/* Green dot for online users */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

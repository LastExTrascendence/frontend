"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "@/components/SocketProvider";
import { useRecoilValue } from "recoil";

import Image from "next/image";

import { myState } from "@/utils/myState";
import showTime from "@/utils/showTime";
import UserInfoCard from "@/ui/user-info-card";

interface Message {
  time: string;
  sender: number; // mystate id
  receiver: string; // receiver nickname
  content: string; //
}

export default function DM({ params }: { params: { nickname: string } }) {
  const myInfo = useRecoilValue(myState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { socket, isConnected } = useSocket();
  const [userId, setUserId] = useState(+new Date());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const messageListener = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.emit("getRedis", { sender: myInfo.id, receiver: params.nickname });
    socket.on("msgToClient", messageListener);

    return () => {
      socket.off("msgToClient", messageListener);
    };
  }, [socket]);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const messsage: Message = {
      time: showTime(new Date()),
      sender: myInfo.id,
      receiver: params.nickname,
      content: currentMessage,
    };

    socket.emit("msgToServer", messsage);
    setCurrentMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  return (
    <div className="m-12 flex max-h-[1833px] min-h-[400px] w-full min-w-[400px] flex-row content-center items-start">
      <div className="flex h-full w-full flex-col bg-chatColor p-9">
        <div className="content-start items-center overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className="grid grid-cols-[auto_auto_1fr] gap-4 rounded-lg px-2 pb-1 text-base text-white hover:bg-gray-700"
            >
              <span className="max-w-[100px] overflow-hidden">
                {message.time ? message.time : showTime(new Date())}
              </span>
              <span className="max-w-[100px] overflow-hidden">
                {message.sender ? message.sender : myInfo.id}
              </span>
              <span>{message.content ? message.content : "noncon"}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="my-2 w-full grow" />

        <div className="bg-chatInputColor flex min-h-[35px] w-full rounded-md shadow-sm">
          <input
            className="placeholder:text-muted-foreground focus-visible:ring-ring border-input focus-visible:false flex-1 rounded-md rounded-l-md bg-transparent p-2 text-sm text-white shadow-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder={`Send message to ${params.nickname}`}
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
      <UserInfoCard />
    </div>
  );
}

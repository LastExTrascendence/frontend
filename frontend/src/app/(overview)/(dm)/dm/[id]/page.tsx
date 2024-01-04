"use client";

import React, { useState, useEffect } from "react";
import { useSocket } from "@/components/SocketProvider";
import { useRecoilValue } from "recoil";
import { myState } from "@/utils/myState";

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
      sender: myInfo.id,
      receiver: params.nickname,
      content: currentMessage,
    };

    socket.emit("msgToServer", messsage);
    setCurrentMessage("");
  };

  return (
    <div className="bg-card text-card-foreground mx-auto w-[300px] overflow-y-auto rounded-xl border shadow ">
      <div className="p-6">
        <p>{isConnected ? "연결 완료" : "연결중"}</p>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm " +
                (message.sender !== myInfo.nickname
                  ? "ml-auto bg-blue-400 text-white"
                  : "bg-zinc-100")
              }
            >
              {message.content}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center p-6 pt-0">
        <form className="flex w-full items-center space-x-2">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full flex-1 rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
          ></input>
          <button
            type="submit"
            onClick={(e) => sendMessage(e)}
            className="focus-visible:ring-ring hover:bg-primary/90 inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md bg-blue-600 text-sm font-medium text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
          >
            전송
          </button>
        </form>
      </div>
    </div>
  );
}

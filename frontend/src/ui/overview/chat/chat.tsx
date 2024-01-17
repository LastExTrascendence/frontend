import { useState, useRef, useEffect } from 'react'
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";

import MessageItem from "@/ui/overview/channel/message-item";
import MessageInput from "@/ui/overview/channel/message-input";
import GrowBlank from "@/ui/grow-blank";
import { useGameSocket } from "@/components/GameSocketProvider";
import useChannelListener from "@/hooks/useChannelListener";
import { Message } from "@/types/interface/chat.interface";

export default function Chat(name: string) {
  const myInfo = useRecoilValue(myState);
  const [messages, setMessages] = useState<Message[]>([]);
  const { gameSocket, sendGameMessage } = useGameSocket();
  const messagesEndRef = useRef(null);
  const messageRef = useRef("");
  useChannelListener(gameSocket, setMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (message: string) => {
    if (!gameSocket) return;
    if (!message) return;
    if (!myInfo.id) return;
    if (!name) return;
    gameSocket.emit("sendMessage", {
      message,
      title: name,
      sender: myInfo.id,
    });
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(e.target.value);
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-chatColor p-9">
      <div className="w-full content-start items-center overflow-y-scroll">
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <GrowBlank />
      <MessageInput
        messageRef={messageRef}
        handleKeyDown={handleKeyDown}
        sendMessage={sendMessage(messageRef.current?.value)}
        name={name}
      />
    </div>
  )
}
"use client";

import { useState, useRef, useEffect } from 'react'
import { useChannelSocket } from "@/components/ChannelSocketProvider";
import useChannelListener from "@/hooks/useChannelListener";
import MessageItem from "@/ui/overview/channel/message-item";
import MessageInput from "@/ui/overview/channel/message-input";
import GrowBlank from "@/ui/grow-blank";
import { Message } from "@/types/interface/chat.interface";
import { UserInfoDto } from '@/types/interface/user.interface';

export default function ChannelChat({ name, myInfo }: { name: string, myInfo: UserInfoDto }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { channelSocket } = useChannelSocket();
  const messagesEndRef = useRef(null);

  useChannelListener(channelSocket, setMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (message: string) => {
    if (!channelSocket || !message || !myInfo.id || !name) return;
    channelSocket.emit("msgToServer", {
      time: new Date(),
      title: name,
      sender: myInfo.id,
      content: message,
    });
  }

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
        sendMessage={sendMessage}
        name={name}
      />
    </div>
  )
}
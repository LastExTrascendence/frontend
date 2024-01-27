import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";
import { useGameSocket } from "@/components/GameSocketProvider";
import GrowBlank from "@/ui/grow-blank";
import MessageInput from "@/ui/overview/channel/message-input";
import MessageItem from "@/ui/overview/channel/message-item";
import { Message } from "@/types/interface/chat.interface";
import useChannelListener from "@/hooks/useChannelListener";

export default function GameChat({ name }: { name: string }) {
  const myInfo = useRecoilValue(myState);
  const [messages, setMessages] = useState<Message[]>([]);
  const { gameSocket } = useGameSocket();
  const messagesEndRef = useRef(null);

  useChannelListener(gameSocket, setMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (message: string) => {
    if (!gameSocket || !message || !myInfo.id || !name) return;
    gameSocket.emit("msgToServer", {
      time: new Date(),
      title: name,
      sender: myInfo.id,
      content: message,
    });
  };

  return (
    <div className="flex h-full w-full flex-col bg-chatColor p-4 rounded-[20px] ">
      <div className="w-full content-start items-center overflow-y-scroll">
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <GrowBlank />
      <MessageInput sendMessage={sendMessage} name={name} />
    </div>
  );
}

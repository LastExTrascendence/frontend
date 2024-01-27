"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useChannelSocket } from "@/components/ChannelSocketProvider";
import MessageInput from "@/ui/overview/channel/message-input";
import { Message } from "@/types/interface/chat.interface";
import { UserInfoDto } from "@/types/interface/user.interface";
import useChannelListener from "@/hooks/useChannelListener";

export const ChatMessageAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 1rem;

  @media (max-width: 610px) {
    border-radius: 0;
  }
`;

const ChatHistoryContainerStyled = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 100%;
`;

const ChatContentStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 0.3rem;
`;

const TimeStampStyled = styled.div`
  font-size: 0.7rem;
  color: var(--line-color-light-gray);
  min-width: 50px;
  margin-right: 0.5rem;
`;

const SenderStyled = styled.div`
  font-size: 0.8rem;
  color: var(--light-gray);
  margin-right: 0.5rem;
`;

const MessageStyled = styled.div`
  font-size: 1rem;
  color: var(--white);
  word-break: break-all;
`;

export default function ChannelChat({
  name,
  myInfo,
}: {
  name: string;
  myInfo: UserInfoDto;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { channelSocket } = useChannelSocket();
  const messagesContainerRef = useRef<null | HTMLDivElement>(null);

  useChannelListener(channelSocket, setMessages);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
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
  };

  return (
    <>
      <ChatHistoryContainerStyled ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <ChatContentStyled key={index}>
            <TimeStampStyled>
              <>{message.time ? message.time : ""}</>
            </TimeStampStyled>
            <SenderStyled>
              <>{message.sender ? message.sender : ""}</>
            </SenderStyled>
            <MessageStyled>
              <>{message.content ? message.content : ""}</>
            </MessageStyled>
          </ChatContentStyled>
        ))}
      </ChatHistoryContainerStyled>
      <MessageInput sendMessage={sendMessage} name={`${name} channel`} />
    </>
  );
}

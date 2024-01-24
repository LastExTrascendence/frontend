"use client";

import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { myState } from "@/recoil/atom";
import { useSocket } from "@/components/SocketProvider";
import MessageInput from "@/ui/overview/channel/message-input";
import useDMListener from "@/hooks/useDMListener";
import useGetRedis from "@/hooks/useGetRedis";

const DMHistoryContainerStyled = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 100%;
`;

const DMContentStyled = styled.div`
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

export default function DMChat({ nickname }: { nickname: string }) {
  const myInfo = useRecoilValue(myState);
  const setMyInfo = useSetRecoilState(myState);
  const [messages, setMessages] = useState<Message[]>([]);
  const { socket } = useSocket();
  const messagesContainerRef = useRef<null | HTMLDivElement>(null);

  useDMListener(socket, setMessages);
  useGetRedis(socket, myInfo.beforeUserNick, myInfo.id, nickname);

  const updateBeforeUserNick = (newNick: string) => {
    setMyInfo((prevMyInfo) => ({
      ...prevMyInfo,
      beforeUserNick: newNick,
    }));
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = (message: string) => {
    if (!socket || !message || !myInfo.id || !nickname) return;
    socket.emit("msgToServer", {
      time: new Date(),
      sender: myInfo.id,
      receiver: nickname,
      content: message,
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    updateBeforeUserNick(nickname);
  }, [nickname]);

  return (
    <>
      <DMHistoryContainerStyled ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <DMContentStyled key={index}>
            <TimeStampStyled>
              <>{message.time ? message.time : ""}</>
            </TimeStampStyled>
            <SenderStyled>
              <>{message.sender ? message.sender : ""}</>
            </SenderStyled>
            <MessageStyled>
              <>{message.content ? message.content : ""}</>
            </MessageStyled>
          </DMContentStyled>
        ))}
      </DMHistoryContainerStyled>
      <MessageInput sendMessage={sendMessage} name={nickname} />
    </>
  );
}

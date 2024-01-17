import Image from "next/image";
import { useRef } from "react";
import styled from "styled-components";
import { MessageInputProps } from "@/types/interface/chat.interface";

const MessageInputContainer = styled.div`
  display: flex;
  min-height: 35px;
  width: 100%;
  border-radius: 0.375rem;
  background-color: var(--chatInputColor);
`;

const StyledInput = styled.input`
  flex-grow: 1;
  border-radius: 0.375rem;
  background-color: transparent;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: white;
  border: var(--border-input);

  &:focus {
    /* for safari */
    outline: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: none;
  }

  &::placeholder {
    color: var(--light-gray);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const SendButton = styled.button`
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: white;
  &:focus-visible {
    outline: none;
    ring: 1px;
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

export default function MessageInput({
  sendMessage,
  name,
}: MessageInputProps) {
  const messageRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(messageRef.current?.value);
      messageRef.current.value = ""; // 입력 필드 초기화
    }
  };

  return (
    <MessageInputContainer>
      <StyledInput
        ref={messageRef}
        type="text"
        placeholder={`Send message to ${name}`}
        onKeyDown={handleKeyDown}
      />
      <SendButton type="submit" onClick={() => {
        sendMessage(messageRef.current?.value);
        messageRef.current.value = ""; // 입력 필드 초기화
      }}>
        <Image src="/send.svg" alt="SendButton" width={30} height={30} />
      </SendButton>
    </MessageInputContainer>
  );
}

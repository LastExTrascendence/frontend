import Image from "next/image";
import React from "react";
import styled from "styled-components";

import { MessageInputProps } from "@/types/interface/chat.interface";
import { useState } from "react";

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

// messageRef,
export default function MessageInput({
  currentMessage,
  setCurrentMessage,
  handleKeyDown,
  sendMessage,
  name,
}: MessageInputProps) {
  // const [currentMessage, setCurrentMessage] = useState("");

  return (
    <MessageInputContainer>
      <StyledInput
        type="text"
        placeholder={`Send message to ${name}`}
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SendButton type="submit" onClick={sendMessage}>
        <Image src="/send.svg" alt="SendButton" width={30} height={30} />
      </SendButton>
    </MessageInputContainer>
  );
}

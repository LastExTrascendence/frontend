import styled from "styled-components";

import { Message } from "@/types/interface/chat.interface";

const MessageContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 1rem;
  border-radius: 0.5rem;
  padding: 0.125rem 0.5rem 0.125rem 0.25rem;
  font-size: 1rem;
  color: white;
  overflow: hidden;
  &:hover {
    background-color: var(--gray-700);
    opacity: 0.8;
  }
`;

const MessageText = styled.span`
  min-width: 70px;
  max-width: 100px;
  overflow: hidden;
`;

const MessageContent = styled.span``;

export default function MessageItem({ message }: { message: Message }) {
  return (
    <MessageContainer>
      <MessageText>{message.time}</MessageText>
      <MessageText>{message.sender}</MessageText>
      <MessageContent>{message.content}</MessageContent>
    </MessageContainer>
  );
}

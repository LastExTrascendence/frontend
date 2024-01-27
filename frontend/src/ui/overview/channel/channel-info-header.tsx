import styled from "styled-components";

const ChannelInfoHeaderStyled = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  font-size: 2.25rem; /* 36px */
  line-height: 2.5rem; /* 40px */
  color: var(--white);
  margin: 1rem 0 0.5rem;

  &::after {
    content: "";
    position: relative;
    top: 1rem;
    width: 100%;
    height: 1px;
    background-color: var(--line-color-light-gray);
  }
`;

export default function ChannelInfoHeader({ name }: { name: string }) {
  return <ChannelInfoHeaderStyled>#{name}</ChannelInfoHeaderStyled>;
}

"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { myState } from "@/recoil/atom";
import { useChannelSocket } from "@/components/ChannelSocketProvider";
import ChannelChat from "@/ui/overview/channel/channel-chat";
import ChannelInfo from "@/ui/overview/channel/channel-info";
import useChannelHandler from "@/hooks/useChannelHandler";
import { useMenu } from "@/hooks/useMenu";

export const ChannelPageStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ChannelContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 50px);
  height: calc(100% - 50px);
  border-radius: 20px;
  background-color: var(--gray);

  @media (max-width: 610px) {
    width: calc(100%);
    height: calc(100%);
    border-radius: 0;
  }
`;

export const ChannelWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100%);
  height: calc(100%);
  background-color: var(--gray);
  border-radius: 20px;

  @media (max-width: 610px) {
    width: calc(100%);
    height: calc(100%);
    margin: 0;
    border-radius: 0;
    justify-content: flex-end;
  }
`;

export const ChannelChatAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  /* border-radius: 20px; */
  padding: 1rem;

  @media (max-width: 610px) {
    border-radius: 0;
  }
`;

export const ChannelInfoButtonStyled = styled.button`
  display: none;

  @media (max-width: 610px) {
    display: flex;
    position: absolute;
    top: calc(50%);
    right: 0;
    margin: 10px;
    cursor: pointer;
    /* z-index: 100; */
  }
`;

export default function Page({ params }: { params: { id: string } }) {
  const myInfo = useRecoilValue(myState);
  const { setChannelId, setUserId } = useChannelSocket();
  const { openChannelInfoCard } = useMenu();

  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  useChannelHandler(myInfo.id, params.id, setUserId, setChannelId);

  return (
    <ChannelPageStyled>
      <ChannelContainerStyled>
        <ChannelWrapperStyled>
          <ChannelChatAreaStyled>
            <ChannelInfoButtonStyled
              onClick={() => {
                openChannelInfoCard();
              }}
            >
              <Image
                src="/arrow_left.svg"
                alt="ChannelInfoToggler"
                width={30}
                height={30}
              />
            </ChannelInfoButtonStyled>
            <ChannelChat name={name} myInfo={myInfo} />
          </ChannelChatAreaStyled>
          <ChannelInfo name={name} myInfo={myInfo} />
        </ChannelWrapperStyled>
      </ChannelContainerStyled>
    </ChannelPageStyled>
  );
}

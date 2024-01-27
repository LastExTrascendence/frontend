import styled from "styled-components";
import ChannelInfoHeader from "@/ui/overview/channel/channel-info-header";
import ChannelUserList from "@/ui/overview/channel/channel-user-list";
import { UserInfoDto } from "@/types/interface/user.interface";

export const ChannelInfoAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: var(--background-dark-gray);
  padding: 1rem;

  @media (max-width: 610px) {
    border-radius: 20px 0 0 20px;
    height: calc(100% - 90px);
    /* width: 100%; */
  }
`;

export default function ChannelInfo({
  name,
  myInfo,
}: {
  name: string;
  myInfo: UserInfoDto;
}) {
  return (
    <ChannelInfoAreaStyled id="channelInfoCard">
      {/* <div className="hidden h-full min-w-[300px] max-w-[350px] flex-col overflow-y-scroll bg-userInfoColor p-9 md:block"> */}
      <ChannelInfoHeader name={name} />
      <ChannelUserList name={name} myInfo={myInfo} />
      {/* </div> */}
    </ChannelInfoAreaStyled>
  );
}

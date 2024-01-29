import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { needFriendSectionUpdateState } from "@/recoil/atom";
import { useSocket } from "@/components/SocketProvider";
import FriendSectionFriendList from "@/ui/overview/sidenavbar/friend/friend-section-friend-list";
import FriendSectionMyStatus from "@/ui/overview/sidenavbar/friend/friend-section-mystatus";
import FriendSectionOnlineCount from "@/ui/overview/sidenavbar/friend/friend-section-online-count";
import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import { UserFriendListResponseDto } from "@/types/dto/user.dto";
import { UserInfoDto } from "@/types/interface/user.interface";
import { axiosGetFriends } from "@/api/axios/axios.custom";
import useFriendStatusListner from "@/hooks/useFriendStatusListner";

const FriendSectionStyled = styled.section`
  display: flex;
  background-color: var(--gray);
  width: 240px;
  min-width: 240px;
  flex-direction: column;
`;

export default function FriendSection() {
  const [friendsList, setFriendsList] =
    useState<UserFriendListResponseDto>(undefined);
  const [needFriendSectionUpdate, setNeedFriendSectionUpdate] = useRecoilState(
    needFriendSectionUpdateState,
  );
  const { socket } = useSocket();

  useFriendStatusListner({ socket, friendsList, setFriendsList });

  const tryGetFriendsList = async () => {
    try {
      const response = await axiosGetFriends()
        .then((res) => {
          setTimeout(() => {
            setFriendsList(res.data as UserInfoDto[]);
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            setFriendsList(STATUS_400_BAD_REQUEST);
          }, 500);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    tryGetFriendsList();
  }, []);

  useEffect(() => {
    if (needFriendSectionUpdate) {
      tryGetFriendsList();
      setNeedFriendSectionUpdate(false);
    }
  }, [needFriendSectionUpdate]);

  return (
    <FriendSectionStyled>
      <FriendSectionOnlineCount friendList={friendsList} />
      <FriendSectionFriendList friendList={friendsList} />
      <FriendSectionMyStatus />
    </FriendSectionStyled>
  );
}

import { useEffect, useState } from "react";
import styled from "styled-components";
import FriendSectionFriendList from "@/ui/overview/sidenavbar/friend/friend-section-friend-list";
import FriendSectionMyStatus from "@/ui/overview/sidenavbar/friend/friend-section-mystatus";
import FriendSectionOnlineCount from "@/ui/overview/sidenavbar/friend/friend-section-online-count";
import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import { UserFriendListResponseDto } from "@/types/dto/user.dto";
import { axiosGetFriends } from "@/api/axios/axios.custom";

const FriendSection = () => {
  const [friendsList, setFriendsList] =
    useState<UserFriendListResponseDto>(undefined);

  useEffect(() => {
    tryGetFriendsList();
  }, []);

  const tryGetFriendsList = async () => {
    try {
      const response = await axiosGetFriends()
        .then((res) => {
          console.log(res.data);
          setTimeout(() => {
            setFriendsList(res.data);
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

  return (
    <FriendSectionStyled>
      <FriendSectionOnlineCount friendList={friendsList} />
      <FriendSectionFriendList friendList={friendsList} />
      <FriendSectionMyStatus />
    </FriendSectionStyled>
  );
};

const FriendSectionStyled = styled.section`
  display: flex;
  background-color: var(--gray);
  width: 240px;
  min-width: 240px;
  flex-direction: column;
`;

export default FriendSection;

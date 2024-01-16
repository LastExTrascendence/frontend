import styled from "styled-components";
import LoadingAnimation from "@/ui/loading-animation";
import ProfileImage from "@/ui/profile-image";
import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import { UserCardInfoResponseDto } from "@/types/interface/user.interface";
import { getFormattedDate } from "@/utils/dateUtils";

export default function UserInfoCard({
  userInfo,
}: {
  userInfo: UserCardInfoResponseDto;
}) {
  return (
    <UserInfoAreaStyled id="userInfoCard">
      {userInfo === undefined || userInfo === STATUS_400_BAD_REQUEST ? (
        <LoadingAnimationWrapperStyled>
          <LoadingAnimation />
        </LoadingAnimationWrapperStyled>
      ) : (
        <>
          <ProfileImageWrapperStyled>
            <ProfileImage
              src={userInfo.avatar || "/default_profile.svg"}
              width={100}
              height={100}
              borderRadius={40}
              showBorder={true}
            />
          </ProfileImageWrapperStyled>
          <UserInfoCardStyled>
            <UserInfoDetailWrapperStyled>
              <NicknameStyled>{userInfo.nickname}</NicknameStyled>
              <IntraNameStyled>{userInfo.intra_name}</IntraNameStyled>
              <EmailStyled>{userInfo.email}</EmailStyled>
            </UserInfoDetailWrapperStyled>
            <UserGameRecordCardStyled>
              <RecordWrapperStyled>
                <RecordTextStyled>Total Games</RecordTextStyled>
                <RecordTextStyled>{userInfo.games}</RecordTextStyled>
              </RecordWrapperStyled>
              <RecordWrapperStyled>
                <RecordTextStyled>Wins</RecordTextStyled>
                <RecordTextStyled>{userInfo.wins}</RecordTextStyled>
              </RecordWrapperStyled>
              <RecordWrapperStyled>
                <RecordTextStyled>Loses</RecordTextStyled>
                <RecordTextStyled>{userInfo.loses}</RecordTextStyled>
              </RecordWrapperStyled>
            </UserGameRecordCardStyled>
          </UserInfoCardStyled>
          {userInfo.is_friend && (
            <FriendInfoWrapperStyled>
              <FriendInfoCardStyled>
                <FriendInfoTextWrapperStyled>
                  <FriendInfoTextStyled>Friend since</FriendInfoTextStyled>
                  <FriendInfoTextStyled>
                    {getFormattedDate(new Date(userInfo.at_friend))}
                  </FriendInfoTextStyled>
                </FriendInfoTextWrapperStyled>
              </FriendInfoCardStyled>
            </FriendInfoWrapperStyled>
          )}
        </>
      )}
    </UserInfoAreaStyled>
  );
}

const LoadingAnimationWrapperStyled = styled.div`
  width: 250px;
  padding: 1rem;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const UserInfoAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* width: 300px; */
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

const ProfileImageWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 2rem 0;
`;

const UserInfoCardStyled = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-gray);
  color: var(--white);
`;

const UserInfoDetailWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  margin-top: 1rem;
`;

const NicknameStyled = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
`;

const IntraNameStyled = styled.div`
  font-size: 1.125rem;
  font-weight: 400;
`;

const EmailStyled = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
`;

const UserGameRecordCardStyled = styled.div`
  width: 230px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--gray);
  border-radius: 20px;
  margin: 1.25rem 0;
`;

const RecordWrapperStyled = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin: 0.25rem 0 0.25rem 1rem;
`;

const RecordTextStyled = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

const FriendInfoWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`;

const FriendInfoCardStyled = styled.div`
  width: 250px;
  height: 50px;
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--background-gray);
  color: var(--white);
  margin-bottom: 1rem;
`;

const FriendInfoTextWrapperStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0.25rem 0;
  padding: 0 1rem;
`;

const FriendInfoTextStyled = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
`;

export const UserInfoButtonStyled = styled.button`
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

import styled from "styled-components";
import { UserCardInfoDto } from "@/types/interface/user.interface";
import ProfileImage from "./profile-image";

export default function UserInfoCard({
  userInfo,
}: {
  userInfo: UserCardInfoDto;
}) {
  return (
    <UserInfoAreaStyled>
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
    </UserInfoAreaStyled>
  );
}

const UserInfoAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 100%;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: var(--background-dark-gray);
  padding: 1rem;

  @media (max-width: 610px) {
    display: none;
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
  margin-bottom: 20px;
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

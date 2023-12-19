import styled from "styled-components";
import Image from "next/image";

export default function ProfileImage() {
  return (
    <ProfileImageStyled>
      <Image
        src="/default_profile.svg"
        alt="Profile Image"
        width={100}
        height={100}
        priority
      />
    </ProfileImageStyled>
  );
}

const ProfileImageStyled = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 40px;
  background: var(--light-gray);
  display: flex;
  justify-content: center;
  align-items: center;
`;

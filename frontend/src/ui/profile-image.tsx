import styled from "styled-components";
import Image from "next/image";

export default function ProfileImage({
  width = 100,
  height = 100,
  showOutline = false,
}: {
  width: number;
  height: number;
  showOutline?: boolean;
}) {
  return (
    <ProfileImageStyled
      $width={width}
      $height={height}
      $showOutline={showOutline}
    >
      <Image
        src="/default_profile.svg"
        alt="Profile Image"
        width={width}
        height={height}
        priority
      />
    </ProfileImageStyled>
  );
}

const ProfileImageStyled = styled.div<{
  $width?: number;
  $height?: number;
  $showOutline?: boolean;
}>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  border-radius: 20px;
  background: var(--light-gray);
  display: flex;
  justify-content: center;
  align-items: center;
  outline: ${({ $showOutline }) =>
    $showOutline ? "1px solid var(--black)" : ""};
`;

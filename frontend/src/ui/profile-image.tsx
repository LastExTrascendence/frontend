import styled from "styled-components";
import Image from "next/image";

export default function ProfileImage({
  src = "/default_profile.svg",
  width = 100,
  height = 100,
  borderRadius = 20,
  showOutline = false,
  showBorder = false,
}: {
  src?: string;
  width: number;
  height: number;
  borderRadius?: number;
  showOutline?: boolean;
  showBorder?: boolean;
}) {
  return (
    <ProfileImageStyled
      $width={width}
      $height={height}
      $borderRadius={borderRadius}
      $showOutline={showOutline}
      $showBorder={showBorder}
    >
      <Image
        src={src}
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
  $borderRadius?: number;
  $showOutline?: boolean;
  $showBorder?: boolean;
}>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  border-radius: ${({ $borderRadius }) => $borderRadius}px;
  background: var(--light-gray);
  display: flex;
  justify-content: center;
  align-items: center;
  outline: ${({ $showOutline }) =>
    $showOutline ? "1px solid var(--black)" : ""};
  border: ${({ $showBorder }) =>
    $showBorder ? "5px solid var(--main-purple)" : ""};
`;

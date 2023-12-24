import styled from "styled-components";
import Image from "next/image";
import { IconContainerProps } from "@/types/interface/icon.interface";

function IconContainer({
  width = 40,
  height = 40,
  iconPath,
  iconColor = "var(--light-gray)",
  fontColor = "var(--light-gray)",
  text,
  onClick,
}: IconContainerProps) {
  return (
    <IconContainerStyled onClick={onClick}>
      <Image
        src={iconPath}
        alt="Logo"
        width={width}
        height={height}
        style={{ fill: iconColor }}
        layout="fixed"
      />
      <IconTextStyled fontColor={fontColor}>{text}</IconTextStyled>
    </IconContainerStyled>
  );
}

const IconContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const IconTextStyled = styled.span<{ fontColor: string }>`
  color: ${(props) => props.fontColor};
`;

export default IconContainer;

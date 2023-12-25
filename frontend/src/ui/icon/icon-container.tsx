import styled from "styled-components";
import Image from "next/image";
import { IconContainerProps } from "@/types/interface/icon.interface";

function IconContainer({
  width = 40,
  height = 40,
  iconPath,
  iconColor = "var(--light-gray)",
  fontColor = "var(--light-gray)",
  fontWeight = 400,
  text,
  onClick,
}: IconContainerProps) {
  return (
    <IconContainerStyled onClick={onClick}>
      <Image
        src={iconPath}
        alt={`${text} icon`}
        width={width}
        height={height}
        style={{ fill: iconColor }}
      />
      <IconTextStyled $fontColor={fontColor} $fontWeight={fontWeight}>
        {text}
      </IconTextStyled>
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

const IconTextStyled = styled.span<{ $fontColor: string; $fontWeight: number }>`
  color: ${(props) => props.$fontColor};
  font-weight: ${(props) => props.$fontWeight};
`;

export default IconContainer;

import styled, { css } from "styled-components";

export interface PillButtonProps {
  disabled?: boolean;
  fontWeight?: string;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  text: string;
  width?: string;
  height?: string;
  theme: string;
}

export default function PillButton({
  onClick,
  text,
  width = "320px",
  height = "70px",
  fontWeight,
  theme,
  disabled,
}: PillButtonProps) {
  return (
    <PillButtonStyled
      onClick={onClick}
      width={width}
      height={height}
      $fontWeight={fontWeight}
      theme={theme}
      disabled={disabled}
    >
      {text}
    </PillButtonStyled>
  );
}

const PillButtonStyled = styled.button<{
  width?: string;
  height?: string;
  $fontWeight?: string;
  theme: string;
  disabled?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 100px;
  font-size: 20px;
  font-weight: ${(props) => props.$fontWeight};
  border: none;
  cursor: pointer;
  transition: 0.3s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    opacity: 0.8;
  }

  ${(props) =>
    props.theme === "purple" &&
    css`
      background-color: var(--main-purple);
      color: var(--white);
    `}
  ${(props) =>
    props.theme === "white" &&
    css`
      background-color: var(--white);
      border: 2px solid var(--main-purple);
      color: var(--main-purple);
    `}
`;

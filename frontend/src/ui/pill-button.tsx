import styled, { css } from "styled-components";
import LoadingAnimation from "./loading-animation";

export interface PillButtonProps {
  disabled?: boolean;
  fontWeight?: string;
  fontStyle?: string;
  fontSize?: string;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  text: string;
  width?: string;
  height?: string;
  theme: string;
  isLoading?: boolean;
}

export default function PillButton({
  onClick,
  text,
  width = "320px",
  height = "70px",
  fontWeight,
  fontStyle = "normal",
  fontSize = "20px",
  theme,
  disabled = false,
  isLoading = false,
}: PillButtonProps) {
  return (
    <PillButtonStyled
      onClick={onClick}
      width={width}
      height={height}
      $fontWeight={fontWeight}
      $fontStyle={fontStyle}
      $fontSize={fontSize}
      theme={theme}
      disabled={disabled}
      type="button"
    >
      {isLoading ? <LoadingAnimation></LoadingAnimation> : text}
    </PillButtonStyled>
  );
}

const PillButtonStyled = styled.button<{
  width?: string;
  height?: string;
  $fontWeight?: string;
  $fontStyle?: string;
  $fontSize?: string;
  theme: string;
  disabled?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 100px;
  font-size: ${(props) => props.$fontSize};
  font-weight: ${(props) => props.$fontWeight};
  font-style: ${(props) => props.$fontStyle};
  border: none;
  cursor: pointer;
  transition: 0.3s;
  margin: 0.5rem 0.5rem;

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
    ${(props) =>
    props.theme === "gray" &&
    css`
      background-color: var(--gray);
      color: var(--white);
      &:hover {
        text-decoration: underline;
      }
    `}
    ${(props) =>
    props.theme === "lightgray" &&
    css`
      background-color: var(--light-gray);
      color: var(--white);
    `}
`;

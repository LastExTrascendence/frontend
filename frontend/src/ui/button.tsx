import React from "react";
import styled, { css } from "styled-components";

interface ButtonInterface {
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  text: string;
  theme: string;
  disabled?: boolean;
}

const Button = (props: ButtonInterface) => {
  return (
    <ButtonContainerStyled
      onClick={props.onClick}
      $theme={props.theme}
      disabled={props.disabled}
    >
      {props.text}
    </ButtonContainerStyled>
  );
};

const ButtonContainerStyled = styled.button<{ $theme: string }>`
  max-width: 240px;
  width: 100%;
  height: 60px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 15px;
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  &:last-child {
    margin-bottom: 0;
  }
  ${(props) =>
    props.$theme === "fill" &&
    css`
      background: var(--main-purple);
      color: var(--white);
    `}
  ${(props) =>
    props.$theme === "line" &&
    css`
      background: var(--white);
      color: var(--main-purple);
      border: 1px solid var(--main-purple);
    `}
  ${(props) =>
    props.$theme === "lightGrayLine" &&
    css`
      background: var(--white);
      color: var(--line-color);
      border: 1px solid var(--line-color);
    `}
  ${(props) =>
    props.$theme === "grayLine" &&
    css`
      background: var(--white);
      color: var(--gray-color);
      border: 1px solid var(--gray-color);
    `}

  @media (max-height: 745px) {
    margin-bottom: 8px;
  }
`;

export default Button;

// import clsx from 'clsx';

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   children: React.ReactNode;
// }

// export function Button({ children, className, ...rest }: ButtonProps) {
//   return (
//     <button
//       {...rest}
//       className={clsx(
//         'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
//         className,
//       )}
//     >
//       {children}
//     </button>
//   );
// }

import { TwoFAType } from "@/app/(overview)/profile/page";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface toggleItem {
  name: string;
  key: string;
}

interface MultiToggleSwitchProps<T> {
  initialState: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  toggleList: toggleItem[];
  width?: string;
}

const MultiToggleSwitch = <T,>({
  initialState,
  setState,
  toggleList,
  width,
}: MultiToggleSwitchProps<T>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const buttons = wrapperRef.current?.querySelectorAll("button");
    buttons?.forEach((button) => {
      if (button.className === initialState) {
        button.style.color = "white";
        button.style.backgroundColor = "var(--main-purple)";
      }
    });
  }, [initialState]);

  function switchToggle(e: React.MouseEvent) {
    const target = e.target as HTMLButtonElement;
    if (target === e.currentTarget) return;
    const buttons = wrapperRef.current?.querySelectorAll("button");
    buttons?.forEach((button) => {
      button.style.color = "white";
      button.style.backgroundColor = "transparent";
    });
    target.style.color = "white";
    target.style.backgroundColor = "var(--main-purple)";
    setState(target.className as React.SetStateAction<T>);
  }

  return (
    <MultiToggleWrapperStyled
      ref={wrapperRef}
      onClick={switchToggle}
      $width={width}
    >
      {toggleList.map((item) => (
        <button
          key={item.key}
          type="button"
          className={item.key}
          style={{
            width: width
              ? Number(width.replace("px", "")) / toggleList.length
              : "fit-content",
          }}
        >
          {item.name}
        </button>
      ))}
    </MultiToggleWrapperStyled>
  );
};

const MultiToggleWrapperStyled = styled.div<{
  $width?: string;
}>`
  width: ${(props) => props.$width || "fit-content"};
  display: flex;
  align-items: center;
  background-color: var(--light-gray);
  border-radius: 10px;
  margin: 0.5rem 0;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    min-width: 50px;
    border-radius: 10px;
    font-size: 0.9rem;
    height: 30px;
    font-weight: 500;
    background-color: transparent;
    color: white;
    padding: 0 0.5rem;
  }
`;

export default MultiToggleSwitch;

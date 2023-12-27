import { TwoFAType } from "@/app/(overview)/profile/page";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface toggleItem {
  name: string;
  key: string;
}

interface MultiToggleSwitchProps<T> {
  initialState: T;
  setState: React.Dispatch<React.SetStateAction<TwoFAType>>;
  toggleList: toggleItem[];
}

const MultiToggleSwitch = <T,>({
  initialState,
  setState,
  toggleList,
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
    setState(target.className as React.SetStateAction<TwoFAType>);
  }

  return (
    <MultiToggleWrapperStyled ref={wrapperRef} onClick={switchToggle}>
      {toggleList.map((item) => (
        <button key={item.key} className={item.key}>
          {item.name}
        </button>
      ))}
    </MultiToggleWrapperStyled>
  );
};

const MultiToggleWrapperStyled = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  background-color: var(--light-gray);
  border-radius: 10px;

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
  }
`;

export default MultiToggleSwitch;

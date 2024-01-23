import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useSocket } from "@/components/SocketProvider";
import { MainButtonItemProps } from "@/lib/definitions";
import PillButton from "../pill-button";

const slideDown = keyframes`
  from {
    transform: translateY(-100%) translateX(-50%);
  }
  to {
    transform: translateY(0) translateX(-50%);
  }
`;

const QueueStatusContainer = styled.div<{
  $isVisible: boolean;
}>`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 550px;
  height: 100px;
  background: #2d2d2d;
  border-radius: 10px;
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  animation: ${slideDown} 0.5s ease-out;
  z-index: 1000;
`;

const StatusText = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const TimerText = styled(StatusText)`
  // 타이머에 특화된 스타일 (필요하다면 추가)
`;

const CancelButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const ButtonContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;

  @media (min-width: 1920px) {
    margin: 0 3rem;
  }
`;

const ButtonDescriptionStyled = styled.p`
  color: var(--white);
  font-size: 0.75rem;
  font-weight: 300;
  font-style: italic;
  margin-top: 1rem;

  @media (min-width: 1920px) {
    font-size: 1rem;
    font-weight: 400;
  }
`;

const buttons: MainButtonItemProps[] = [
  {
    href: "/quickstart",
    title: "Quick Start",
    description: "Quickly join queue for 1:1 match",
  },
  {
    href: "/game",
    title: "Game",
    description: "Create or join a game",
  },
  {
    href: "/channel",
    title: "Channel",
    description: "Create or join a channel",
  },
  {
    href: "/profile",
    title: "Profile",
    description: "View or change my settings",
  },
];

function MainButtonList() {
  const router = useRouter();
  const { enterQueue, exitQueue } = useSocket();
  const [isQueueConnected, setIsQueueConnected] = useState(false);
  const [timer, setTimer] = useState(0);

  const onClickHandler = (href: string) => {
    if (isQueueConnected) return;
    if (href === "/quickstart") {
      enterQueue();
      setIsQueueConnected(true);
    } else {
      router.push(href);
    }
  };

  const cancelHandler = () => {
    exitQueue();
    setIsQueueConnected(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isQueueConnected) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      setTimer(0);
    }

    return () => clearInterval(interval);
  }, [isQueueConnected]);

  const formattedTimer = () => {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <>
      <QueueStatusContainer $isVisible={isQueueConnected}>
        <StatusText>Looking for game...</StatusText>
        <TimerText>{formattedTimer()}</TimerText>
        <CancelButton onClick={cancelHandler}>
          <Image src="/symbols_cancel.svg" alt="close" width={40} height={40} />
        </CancelButton>
      </QueueStatusContainer>
      {buttons.map((button) => (
        <ButtonContainerStyled key={button.title}>
          <PillButton
            width="320px"
            height="80px"
            onClick={() => onClickHandler(button.href)}
            fontWeight="800"
            fontStyle="italic"
            fontSize="3rem"
            text={button.title}
            theme="purple"
          />
          <ButtonDescriptionStyled>
            {button.description}
          </ButtonDescriptionStyled>
        </ButtonContainerStyled>
      ))}
    </>
  );
}

export default MainButtonList;

import styled from "styled-components";
import { SideButtonProps } from "@/types/interface/button.interface";
import IconContainer from "@/ui/icon/icon-container";
import { useRouter } from "next/navigation";

const buttons: SideButtonProps[] = [
  {
    text: "Home",
    iconPath: "/home.svg",
    href: "/",
  },
  {
    text: "Games",
    iconPath: "/tabletennis.svg",
    href: "/game",
  },
  {
    text: "Channel",
    iconPath: "/chat.svg",
    href: "/channel",
  },
];

const SideNavButtonList = () => {
  const router = useRouter();
  return (
    <>
      {buttons.map((button) => (
        <SideNavButtonContainerStyled key={button.text}>
          <IconContainer
            key={button.text}
            width={40}
            height={40}
            iconPath={button.iconPath}
            iconColor="var(--light-gray)"
            fontColor="var(--light-gray)"
            text={button.text}
            onClick={() => {
              router.push(button.href);
            }}
          />
        </SideNavButtonContainerStyled>
      ))}
    </>
  );
};

export const SideNavButtonContainerStyled = styled.li`
  display: flex;
  flex-direction: column;
  height: 80px;
  width: 80px;
  border-radius: 32px;
  margin-bottom: 2vh;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: var(--button-hover-dark-gray);
    transition: background-color 0.2s ease-in-out;
  }
`;

export default SideNavButtonList;

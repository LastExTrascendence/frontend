import { useRouter } from "next/navigation";
import styled from "styled-components";
import IconContainer from "@/ui/icon/icon-container";
import { SideButtonProps } from "@/types/interface/button.interface";
import { useMenu } from "@/hooks/useMenu";
import { useTranslation } from "react-i18next";

const SideNavButtonList = () => {
  const router = useRouter();
  const { closeAll } = useMenu();
  const { t } = useTranslation('common');

  const buttons: SideButtonProps[] = [
    {
      text: t("home"),
      iconPath: "/home.svg",
      href: "/",
    },
    {
      text: t("games"),
      iconPath: "/tabletennis.svg",
      href: "/game",
    },
    {
      text: t("channels"),
      iconPath: "/chat.svg",
      href: "/channel",
    },
  ];

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
              closeAll();
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

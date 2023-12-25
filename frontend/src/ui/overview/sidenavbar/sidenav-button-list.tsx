import styled from "styled-components";
import { SideButtonProps } from "@/types/interface/button.interface";
import IconContainer from "@/ui/icon/icon-container";

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
  return (
    <>
      {buttons.map((button) => (
        <SideNavButtonContainer key={button.text}>
          <IconContainer
            key={button.text}
            width={40}
            height={40}
            iconPath={button.iconPath}
            iconColor="var(--light-gray)"
            fontColor="var(--light-gray)"
            text={button.text}
            onClick={() => {
              window.location.href = button.href;
            }}
          />
        </SideNavButtonContainer>
      ))}
    </>
    // <>
    //   {buttons.map((button) => (
    //     <SideNavButtonContainer key={button.text}>
    //       <Link
    //         href={button.href}
    //         className="relative items-center justify-center rounded-md"
    //       >
    //         <Image
    //           src={button.iconPath}
    //           alt={button.text}
    //           width={40}
    //           height={40}
    //           priority
    //         />
    //       </Link>
    //       <SideNavButtonTextStyled>{button.text}</SideNavButtonTextStyled>
    //     </SideNavButtonContainer>
    //   ))}
    // </>
  );
};

const SideNavButtonContainer = styled.li`
  display: flex;
  flex-direction: column;
  height: 80px;
  width: 80px;
  border-radius: 32px;
  margin-bottom: 2.5vh;
  justify-content: center;
  align-items: center;
`;

const SideNavButtonTextStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--light-gray);
  font-size: 1rem;
  font-weight: 400;
`;

export default SideNavButtonList;

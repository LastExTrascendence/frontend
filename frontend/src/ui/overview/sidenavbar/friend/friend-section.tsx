import styled from "styled-components";

const FriendSection = () => {
  return (
    <FriendSectionStyled>
      {/* <TopSectionStyled>
        <TopButtonGroupStyled>
          <FriendSectionButtonList />
        </TopButtonGroupStyled>
      </TopSectionStyled>
      <BottomSectionStyled>
        <FriendSectionButtonContainerStyled>
          <LogoutIcon />
        </FriendSectionButtonContainerStyled>
      </BottomSectionStyled> */}
    </FriendSectionStyled>
  );
};

const FriendSectionStyled = styled.section`
  display: flex;
  background-color: var(--gray);
  width: 240px;
  min-width: 240px;
  height: 100%;
`;

export default FriendSection;

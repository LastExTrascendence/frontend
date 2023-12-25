import styled from "styled-components";

export default function TopNavTextLogo() {
  return <TopNavTextLogoStyled>L.E.T</TopNavTextLogoStyled>;
}

const TopNavTextLogoStyled = styled.div`
  font-size: 3rem;
  font-weight: 700;
  font-style: italic;
  color: var(--white);
`;

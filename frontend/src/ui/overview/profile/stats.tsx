import styled from "styled-components";

export default function Stats() {
  return (
    <>
      <StatsContainerStyled>
        <StatContainerStyled>Longest Game</StatContainerStyled>
        <StatContainerStyled>Shortest Game</StatContainerStyled>
        <StatContainerStyled>Avg. Game Time</StatContainerStyled>
        <StatContainerStyled>Total Point Scored</StatContainerStyled>
        <StatContainerStyled>Avg. Score</StatContainerStyled>
        <StatContainerStyled>Avg. Score / Win</StatContainerStyled>
        <StatContainerStyled>Win Streaks</StatContainerStyled>
      </StatsContainerStyled>
    </>
  );
}

const StatsContainerStyled = styled.div`
  padding: 0 1.5rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--white);
`;

const StatContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0.5rem 0;
  width: 100px;
  /* height: 100px; */
`;

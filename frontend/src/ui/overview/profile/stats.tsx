import styled from "styled-components";

export default function Stats() {
  return (
    <>
      <StatsContainerStyled>
        <StatContainerStyled>
          <div>0</div>
          <div>Longest Game</div>
        </StatContainerStyled>
        <StatContainerStyled>
          <div>0</div>
          <div>Shortest Game</div>
        </StatContainerStyled>
        <StatContainerStyled>
          <div>0</div>
          <div>Avg. Game Time</div>
        </StatContainerStyled>
        <StatContainerStyled>
          <div>0</div>
          <div>Total Point Scored</div>
        </StatContainerStyled>
        <StatContainerStyled>
          <div>0</div>
          <div>Avg. Score</div>
        </StatContainerStyled>
        <StatContainerStyled>
          <div>0</div>
          <div>Avg. Score / Win</div>
        </StatContainerStyled>
        <StatContainerStyled>
          <div>0</div>
          <div>Win Streaks</div>
        </StatContainerStyled>
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

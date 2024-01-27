import Image from "next/image";
import styled from "styled-components";
import LoadingAnimation from "@/ui/loading-animation";
import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import { GameStatsResponseDto } from "@/types/interface/game.interface";

export default function Stats({ stats }: { stats: GameStatsResponseDto }) {
  if (stats === undefined) return <LoadingAnimation />;
  return (
    <>
      <StatsContainerStyled>
        {stats === STATUS_400_BAD_REQUEST ? (
          <StatLabelStyled>There is no game record</StatLabelStyled>
        ) : (
          <>
            <StatContainerStyled>
              <Image
                src="/clock.svg"
                alt="longestGameIcon"
                width={50}
                height={50}
              />
              <StatScoreStyled>{stats.longestGame ?? 0}</StatScoreStyled>
              <StatLabelStyled>Longest Game</StatLabelStyled>
            </StatContainerStyled>
            <StatContainerStyled>
              <Image
                src="/clock.svg"
                alt="shortestGameIcon"
                width={50}
                height={50}
              />
              <StatScoreStyled>{stats.shortestGame ?? 0}</StatScoreStyled>
              <StatLabelStyled>Shortest Game</StatLabelStyled>
            </StatContainerStyled>
            <StatContainerStyled>
              <Image
                src="/clock.svg"
                alt="AvgGameTimeIcon"
                width={50}
                height={50}
              />
              <StatScoreStyled>{stats.averageGameTime ?? 0}</StatScoreStyled>
              <StatLabelStyled>Avg. Game Time</StatLabelStyled>
            </StatContainerStyled>
            <StatContainerStyled>
              <Image
                src="/scoreboard.svg"
                alt="totalPointScoredIcon"
                width={50}
                height={50}
              />
              <StatScoreStyled>{stats.totalPointScored ?? 0}</StatScoreStyled>
              <StatLabelStyled>Total Point Scored</StatLabelStyled>
            </StatContainerStyled>
            <StatContainerStyled>
              <Image
                src="/scoreboard.svg"
                alt="avgScoreIcon"
                width={50}
                height={50}
              />
              <StatScoreStyled>
                {stats.averageScorePerGame ?? 0}
              </StatScoreStyled>
              <StatLabelStyled>Avg. Score</StatLabelStyled>
            </StatContainerStyled>
            <StatContainerStyled>
              <Image
                src="/scoreboard.svg"
                alt="avgScorePerWinIcon"
                width={50}
                height={50}
              />
              <StatScoreStyled>{stats.averageScorePerWin ?? 0}</StatScoreStyled>
              <StatLabelStyled>Avg. Score / Win</StatLabelStyled>
            </StatContainerStyled>
          </>
        )}
      </StatsContainerStyled>
    </>
  );
}

const StatsContainerStyled = styled.div`
  height: 100%;
  width: 100%;
  /* display: flex; */
  /* padding: 0 1.5rem; */
  margin: 2rem 0;
  padding-left: 1.5rem;
  display: grid;
  flex-direction: column;
  justify-content: center;
  color: var(--white);
  grid-gap: 0px;
  grid-template-columns: 240px 240px;
  grid-template-rows: 150px 150px 150px;

  @media (max-width: 610px) {
    grid-template-columns: 240px;
    grid-template-rows: 135px 135px 135px 135px 135px 135px;
    /* overflow-y: scroll; */
  }
`;

const StatContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  /* margin: 0.5rem 0; */
  /* width: 100px; */
  /* height: 100px; */
`;

const StatScoreStyled = styled.div`
  color: var(--white);
  font-size: 2rem;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
  margin: 0.5rem 0;
`;

const StatLabelStyled = styled.div`
  color: var(--white);
  font-size: 1.5rem;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
`;

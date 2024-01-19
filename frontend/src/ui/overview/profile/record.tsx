import styled from "styled-components";
import LoadingAnimation from "@/ui/loading-animation";
import {
  CellHeaderStyled,
  CellStyled,
  ChannelListContainerStyled,
  RowStyled,
  TableBody,
  TableHeader,
} from "@/ui/overview/game/game-list";
import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import { GameRecordListResponseDto } from "@/types/interface/game.interface";
import { getNDaysAgoString } from "@/utils/dateUtils";

export default function Record({
  games,
}: {
  games: GameRecordListResponseDto;
}) {
  if (games === undefined) return <LoadingAnimation />;

  return (
    <ChannelListContainerStyled>
      <TableHeader>
        <CellHeaderStyled>Player</CellHeaderStyled>
        <CellHeaderStyled>Result</CellHeaderStyled>
        <CellHeaderStyled>Type</CellHeaderStyled>
        <CellHeaderStyled>Mode</CellHeaderStyled>
        <CellHeaderStyled>Date</CellHeaderStyled>
      </TableHeader>
      <TableBody>
        {games !== STATUS_400_BAD_REQUEST ? (
          games.map((game: any, idx: number) => (
            <RowStyled key={idx} onClick={() => {}} className="channel">
              <CellStyled className="align-center">{game.nickname}</CellStyled>
              <CellStyled className="align-center">
                {game.gameUserRole}
              </CellStyled>
              <CellStyled className="align-center">{game.gameType}</CellStyled>
              <CellStyled className="align-center">{game.gameMode}</CellStyled>
              <CellStyled className="align-center">
                {getNDaysAgoString(new Date(game.date))}
              </CellStyled>
            </RowStyled>
          ))
        ) : (
          <RowStyled>전적이 없어요!</RowStyled>
        )}
      </TableBody>
    </ChannelListContainerStyled>
  );
}

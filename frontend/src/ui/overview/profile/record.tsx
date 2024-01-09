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
              <CellStyled className="align-center">{game.player}</CellStyled>
              <CellStyled className="align-center">{game.result}</CellStyled>
              <CellStyled className="align-center">{game.type}</CellStyled>
              <CellStyled className="align-center">{game.mode}</CellStyled>
              <CellStyled className="align-center">{game.date}</CellStyled>
            </RowStyled>
          ))
        ) : (
          <div>전적이 없어요!</div>
        )}
      </TableBody>
    </ChannelListContainerStyled>
  );
}

import styled from "styled-components";
import {
  CellHeaderStyled,
  CellStyled,
  ChannelListContainerStyled,
  RowStyled,
  TableBody,
  TableHeader,
} from "@/ui/overview/game/game-list";
import { GameRecordListDto } from "@/types/interface/game.interface";

export default function Record({ games }: { games: GameRecordListDto[] }) {
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
        {games &&
          games.map((game: any, idx: number) => (
            <RowStyled key={idx} onClick={() => {}} className="channel">
              <CellStyled className="align-center">{game.player}</CellStyled>
              <CellStyled className="align-center">{game.result}</CellStyled>
              <CellStyled className="align-center">{game.type}</CellStyled>
              <CellStyled className="align-center">{game.mode}</CellStyled>
              <CellStyled className="align-center">{game.date}</CellStyled>
            </RowStyled>
          ))}
      </TableBody>
    </ChannelListContainerStyled>
  );
}

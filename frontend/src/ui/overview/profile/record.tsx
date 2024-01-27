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
import { useTranslation } from "react-i18next";

export default function Record({
  games,
}: {
  games: GameRecordListResponseDto;
}) {
  const { t } = useTranslation('profile');

  if (games === undefined) return <LoadingAnimation />;

  return (
    <ChannelListContainerStyled>
      <TableHeader>
        <CellHeaderStyled>{t("player")}</CellHeaderStyled>
        <CellHeaderStyled>{t("result")}</CellHeaderStyled>
        <CellHeaderStyled>{t("type")}</CellHeaderStyled>
        <CellHeaderStyled>{t("mode")}</CellHeaderStyled>
        <CellHeaderStyled>{t("date")}</CellHeaderStyled>
      </TableHeader>
      <TableBody>
        {games !== STATUS_400_BAD_REQUEST && games.length > 0 ? (
          games.map((game: any, idx: number) => (
            <RowStyled key={idx} onClick={() => { }} className="channel">
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
          <div className="flex justify-center items-center h-full w-full text-xl">
            <div>{t("emptyRecord")}</div>
          </div>
        )}
      </TableBody>
    </ChannelListContainerStyled>
  );
}

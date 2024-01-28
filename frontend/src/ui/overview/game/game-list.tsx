"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";
import LoadingAnimation from "@/ui/loading-animation";
import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import { ChannelPolicy } from "@/types/enum/channel.enum";
import {
  GameChannelListDto,
  GameRecordListResponseDto,
} from "@/types/interface/game.interface";
import PrivateGameModal from "@/components/Modals/PrivateGameModal/PrivateGameModal";
import { useTranslation } from "react-i18next";

export const ChannelListContainerStyled = styled.div`
  border-radius: 20px;
  padding: 0 1.5rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--white);
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TableBody = styled.div`
  overflow-y: auto;
  height: 100%;
`;

export const RowStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc;
  height: 60px;

  &.channel {
    cursor: pointer;
    &:hover {
      background-color: var(--zinc-700);
      opacity: 0.8;
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const CellHeaderStyled = styled.div`
  flex: 1;
  width: calc(100% / 4);
  text-align: center;
  padding: 10px;
  font-weight: bold;
`;

export const CellStyled = styled.div`
  flex: 1;
  width: calc(100% / 4);
  padding: 10px;

  &.align-center {
    text-align: center;
  }
`;


export default function GameList({
  games,
}: {
  games: GameRecordListResponseDto;
}) {
  const router = useRouter();
  const myInfo = useRecoilValue(myState);
  const [gameId, setGameId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [showPrivateGameModal, setShowPrivateGameModal] =
    useState<boolean>(false);
  const { t } = useTranslation('game');

  if (games === undefined) return <LoadingAnimation />;

  const togglePrivateGameModal = () => {
    setShowPrivateGameModal(!showPrivateGameModal);
  }

  const handleClosePrivateGameModal = () => {
    setShowPrivateGameModal(false);
  }

  function gameEnterLogic(gameId, gameTitle, gamePolicy) {
    // console.log(gameId, gameTitle, gamePolicy);

    setGameId(gameId);
    setTitle(gameTitle);

    if (gamePolicy === ChannelPolicy.PRIVATE) {
      togglePrivateGameModal();
    } else {
      router.push(`/game/${gameId}?name=${gameTitle}&type=${gamePolicy}`);
    }
  };

  return (
    <ChannelListContainerStyled>
      <TableHeader>
        <CellHeaderStyled>{t("game")}</CellHeaderStyled>
        <CellHeaderStyled>{t("creator")}</CellHeaderStyled>
        <CellHeaderStyled>{t("users")}</CellHeaderStyled>
        <CellHeaderStyled>{t("type")}</CellHeaderStyled>
        <CellHeaderStyled>{t("status")}</CellHeaderStyled>
      </TableHeader>
      <TableBody>
        {games !== STATUS_400_BAD_REQUEST && games.length > 0 ? (
          games.map((game: any) => (
            <RowStyled
              key={game.id}
              onClick={() => {
                gameEnterLogic(game.id, game.title, game.channelPolicy);
                // router.push(`/game/${game.id}?name=${game.title}`);
              }}
              className="channel"
            >
              <CellStyled>{game.title}</CellStyled>
              <CellStyled>{game.creator.nickname}</CellStyled>
              <CellStyled className="align-center">
                {game.cur_user + " / " + game.max_user}
              </CellStyled>
              <CellStyled className="align-center">{game.gameType}</CellStyled>
              <CellStyled className="align-center">
                {game.gameStatus}
              </CellStyled>
            </RowStyled>
          ))
        ) : (
          <div className="flex justify-center items-center h-full w-full text-xl">
            <div>{t("gameEmpty")}</div>
          </div>
        )}
      </TableBody>
      {showPrivateGameModal && (
        <PrivateGameModal closeModal={handleClosePrivateGameModal} gameId={gameId} myInfoId={myInfo.id} title={title} />
      )}
    </ChannelListContainerStyled>
  );
}

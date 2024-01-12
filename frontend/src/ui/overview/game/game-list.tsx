import { useRouter } from "next/navigation";
import styled from "styled-components";
import LoadingAnimation from "@/ui/loading-animation";
import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import { GameRecordListResponseDto } from "@/types/interface/game.interface";

export default function GameList({
  games,
}: {
  games: GameRecordListResponseDto;
}) {
  if (games === undefined) return <LoadingAnimation />;

  const router = useRouter();

  return (
    <ChannelListContainerStyled>
      <TableHeader>
        <CellHeaderStyled>Game</CellHeaderStyled>
        <CellHeaderStyled>Creator</CellHeaderStyled>
        <CellHeaderStyled>Users</CellHeaderStyled>
        <CellHeaderStyled>Type</CellHeaderStyled>
      </TableHeader>
      <TableBody>
        {games !== STATUS_400_BAD_REQUEST ? (
          games.map((game: any) => (
            <RowStyled
              key={game.id}
              onClick={() => {
                router.push(`/game/${game.id}`);
              }}
              className="channel"
            >
              <CellStyled>{game.name}</CellStyled>
              <CellStyled>{game.join_users[0]}</CellStyled>
              <CellStyled className="align-center">
                {game.join_users.length + " / 2"}
              </CellStyled>
              <CellStyled className="align-center">{game.status}</CellStyled>
            </RowStyled>
          ))
        ) : (
          <RowStyled className="channel">
            <div>게임을 생성해주세요!</div>
          </RowStyled>
        )}
      </TableBody>
    </ChannelListContainerStyled>
  );
}

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

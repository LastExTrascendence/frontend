import styled from "styled-components";

export default function GameList({
  games,
  openModal,
}: {
  games: any;
  openModal: any;
}) {
  return (
    <GameListContainerStyled>
      <TableHeader>
        <CellHeaderStyled>Game</CellHeaderStyled>
        <CellHeaderStyled>Creator</CellHeaderStyled>
        <CellHeaderStyled>Users</CellHeaderStyled>
        <CellHeaderStyled>Type</CellHeaderStyled>
      </TableHeader>
      <TableBody>
        {games.map((game: any) => (
          <RowStyled
            key={game.id}
            onClick={() => openModal(game)}
            className="game"
          >
            <CellStyled>{game.name}</CellStyled>
            <CellStyled>{game.join_users[0]}</CellStyled>
            <CellStyled className="align-center">
              {game.join_users.length + " / 2"}
            </CellStyled>
            <CellStyled className="align-center">{game.status}</CellStyled>
          </RowStyled>
        ))}
      </TableBody>
    </GameListContainerStyled>
  );
}

const GameListContainerStyled = styled.div`
  background-color: var(--zinc-800);
  border-radius: 20px;
  padding: 0 1.5rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--white);
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TableBody = styled.div`
  overflow-y: auto;
  height: 100%; // Adjust based on the height of your header
`;

const RowStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc; // Example border for rows
  height: 60px;

  &.game {
    cursor: pointer;
    &:hover {
      background-color: var(--zinc-700);
      opacity: 0.8;
    }
  }
`;

const CellHeaderStyled = styled.div`
  flex: 1; // Adjust this value based on your column width preference
  width: calc(100% / 4); // Adjust this value based on your column count
  text-align: center;
  padding: 10px; // Adjust padding for spacing
  font-weight: bold;
`;

const CellStyled = styled.div`
  flex: 1; // Adjust this value based on your column width preference
  width: calc(100% / 4); // Adjust this value based on your column count
  text-align: left;
  padding: 10px; // Adjust padding for spacing

  &.align-center {
    text-align: center;
  }
`;

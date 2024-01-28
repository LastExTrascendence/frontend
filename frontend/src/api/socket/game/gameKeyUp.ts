
export default function gameKeyUp(
  // gameId: number,
  socket,
  gameId: string,
  team: string,
  key: string,
) {
  if (!socket) return;
  // console.log("keyUp", "id", gameId, "team", team, "key", key);
  socket.emit(`keyUp${team}`, {
    gameId,
    key,
  });
}

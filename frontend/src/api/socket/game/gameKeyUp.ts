
export default function gameKeyUp(
  gameId: number,
  socket: any,
  team: string,
  key: string,
) {
  console.log("keyUp", "room", gameId, "team", team, "key", key);
  socket.emit("keyUp", {
    gameId,
    team,
    key,
  });
}

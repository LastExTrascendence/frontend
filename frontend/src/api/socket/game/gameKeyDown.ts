
export default function gameKeyDown(
  gameId: number,
  socket: any,
  team: string,
  key: string,
) {
  console.log("keyDown","room", gameId, "team", team, "key", key);
  socket.emit("keyDown", {
    gameId,
    team,
    key,
  });
}

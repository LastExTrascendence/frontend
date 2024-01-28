export default function changeRole(
  socket: any,
  title: string | null,
  myId: number,
  userNickname: string,
) {
  // console.log("change role User");
  socket.emit("changeRoleUser", {
    title,
    userId: myId,
    changeNick: userNickname,
  });
}

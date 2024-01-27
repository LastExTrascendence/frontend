export default function muteUser(
  socket: any,
  title: string,
  myId: number,
  userNickname: string,
) {
  // console.log("mute user");
  socket.emit("muteUser", {
    title,
    userId: myId,
    muteNick: userNickname,
  });
}

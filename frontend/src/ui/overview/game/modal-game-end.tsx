import { GameEndData } from "@/types/interface/game.interface";

export default function GameEndModal({ data }: { data: GameEndData }) {
  if (!data) return null; // data 객체가 없으면 렌더링하지 않음

  return (
    <div className="space-y-3 text-lg">
      <p>Winner: <span className="font-semibold text-green-500">{data.winUserNick ? data.winUserNick : ""}</span></p>
      <p>Loser: <span className="font-semibold text-red-500">{data.loseUserNick ? data.loseUserNick : ""}</span></p>
      <p>Play Time: {data.playTime}</p>
      <p>Home Score: {data.homeScore}</p>
      <p>Away Score: {data.awayScore}</p>
    </div>
  );
}

import Link from "next/link";

export default function GameList({ selectedGame }: { selectedGame: any }) {
  return (
    <div className="text-black">
      <p>Game: {selectedGame.name}</p>
      <p>Creator: {selectedGame.join_users[0]}</p>
      <p>Status: {selectedGame.status}</p>
      <p>Map: {selectedGame.map}</p>
      <Link href={`/game/${selectedGame.id}?name=${selectedGame.channel}`}>
        Go to Game
      </Link>
    </div>
  );
}

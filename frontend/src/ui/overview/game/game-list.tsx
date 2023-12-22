export default function GameList({
  games,
  openModal,
}: {
  games: any;
  openModal: any;
}) {
  return (
    <div className="relative mt-3 h-full w-full items-center justify-center rounded-[20px] bg-zinc-800 p-6">
      <div className="flex flex-row items-center justify-center border-b-2">
        <p className="mr-4 flex-1">Game</p>
        <p className="mr-4 flex-1">Creator</p>
        <p className="mr-4 flex-1">Users</p>
        <p className="mr-4 flex-1">Type</p>
      </div>
      <div>
        {games.map((game) => (
          <div
            key={game.id}
            className="flex min-h-[60px] cursor-pointer flex-row items-center justify-center border-b text-sm md:text-lg"
            onClick={() => openModal(game)}
          >
            <p className="mr-4 flex-1">{game.name}</p>
            <p className="mr-4 flex-1">{game.join_users[0]}</p>
            <p className="mr-4 flex-1">{[game.join_users].join(", ")}</p>
            <p className="mr-4 flex-1">{game.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

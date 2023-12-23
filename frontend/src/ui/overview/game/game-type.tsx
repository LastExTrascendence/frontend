export default function GameType({
  gameType,
  setGameType,
}: {
  gameType: string;
  setGameType: (gameType: string) => void;
}) {
  return (
    <div className="relative mb-3 flex flex-col">
      <legend className="mb-1 items-start justify-center">Type</legend>
      <div className="mb-3 flex items-center">
        <label className="flex cursor-pointer items-center">
          <input
            type="radio"
            name="type"
            value="public"
            className="hidden"
            checked={gameType === "public"}
            onChange={() => setGameType("public")}
          />
          <span
            className={`mr-2 inline-block h-4 w-4 rounded-full border-2 ${
              gameType === "public" ? "bg-buttonColor" : "border-gray-300"
            }`}
          ></span>
          Public
        </label>
        <label className="ml-4 flex cursor-pointer items-center">
          <input
            type="radio"
            name="type"
            value="private"
            className="hidden"
            checked={gameType === "private"}
            onChange={() => setGameType("private")}
          />
          <span
            className={`mr-2 inline-block h-4 w-4 rounded-full border-2 ${
              gameType === "private" ? "bg-buttonColor" : "border-gray-300"
            }`}
          ></span>
          Private
        </label>
      </div>
      <div
        className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
          gameType === "private" ? "max-h-40" : "max-h-0"
        }`}
      >
        <label className="flex flex-col items-start justify-center">
          Password
          <input
            type="password"
            name="password"
            className="mt-2 rounded bg-buttonColor p-2 text-white focus:bg-violet-400 focus:outline-none focus:ring-2"
          />
        </label>
      </div>
    </div>
  );
}

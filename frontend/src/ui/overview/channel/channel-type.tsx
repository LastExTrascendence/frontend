export default function channelType({ channelType, setChannelType }) {
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
            checked={channelType === "public"}
            onChange={() => setChannelType("public")}
          />
          <span
            className={`mr-2 inline-block h-4 w-4 rounded-full border-2 ${
              channelType === "public" ? "bg-buttonColor" : "border-gray-300"
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
            checked={channelType === "private"}
            onChange={() => setChannelType("private")}
          />
          <span
            className={`mr-2 inline-block h-4 w-4 rounded-full border-2 ${
              channelType === "private" ? "bg-buttonColor" : "border-gray-300"
            }`}
          ></span>
          Private
        </label>
      </div>
      <div
        className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
          channelType === "private" ? "max-h-40" : "max-h-0"
        }`}
      >
        <label className="flex flex-col items-start justify-center">
          Password
          <input
            type="password"
            name="password"
            className="bg-buttonColor mt-2 rounded p-2 text-white focus:bg-violet-400 focus:outline-none focus:ring-2"
          />
        </label>
      </div>
    </div>
  );
}

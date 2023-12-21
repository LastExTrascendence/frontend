export default function maximumUser({
  userCount,
  setUserCount,
}: {
  userCount: string;
  setUserCount: (count: string) => void;
}) {
  return (
    <fieldset className="relative mb-3">
      <legend className="mb-1 items-start justify-center">User Count</legend>
      <div className="flex flex-row items-start justify-center">
        {[2, 4, 8].map((count) => (
          <label
            key={`user-${count}`}
            className="mr-6 flex cursor-pointer items-center"
          >
            <input
              type="radio"
              name="usercount"
              value={count}
              className="hidden"
              checked={userCount === count.toString()}
              onChange={() => setUserCount(count.toString())}
            />
            <span
              className={`mr-2 inline-block h-4 w-4 rounded-full border-2 ${
                userCount === count.toString()
                  ? "bg-buttonColor"
                  : "border-gray-300"
              }`}
            ></span>
            {count}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

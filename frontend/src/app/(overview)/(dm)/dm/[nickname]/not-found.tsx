"use client";

import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the User.</p>
      <button
        type="button"
        onClick={handleBack}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </button>
    </main>
  );
}

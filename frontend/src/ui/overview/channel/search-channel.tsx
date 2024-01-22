"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import getSearchedUser from "@/api/getSearchedUser";
import chats from "@/lib/chat-data";
import { UserlistProps } from "@/lib/definitions";

export default function SearchChannel({
  placeholder,
}: {
  placeholder: string;
}) {
  const [searchedResults, setSearchedResults] = useState<UserlistProps[]>([]);
  const [query, setQuery] = useState("");

  const fetchSearchResults = async (searchQuery: string) => {
    const res = await getSearchedUser(searchQuery);
    setSearchedResults(res);
  };

  const handleBlur = () => {
    setQuery("");
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    setQuery(term);
    fetchSearchResults(term);
  }, 300);
  return (
    <div className="relative flex h-full flex-1 flex-shrink-0">
      <input
        className="block h-4/5 min-h-[60px] w-2/5 min-w-[100px] rounded-[20px] bg-zinc-800 py-[9px] pl-10 text-xl font-thin text-white outline-none outline-2 placeholder:text-stone-300"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        onBlur={handleBlur}
        onClick={(e) => {
          setQuery(e.target.value);
        }}
        defaultValue={query}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4/5 min-h-[18px] w-[18px] min-w-[18px] -translate-y-1/2 text-stone-300 peer-focus:text-gray-900" />

      {query && (
        <div className="absolute top-full z-50 mt-2 w-full bg-zinc-800">
          {chats.map((result) => (
            <Link key={result.id} href={`/channel/${result.id}`}>
              <div className="flex flex-row items-center justify-center ">
                <p className="block h-full w-full rounded-[32px] border-black border-opacity-50 p-2 text-white hover:bg-gray-100">
                  {result.channel}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

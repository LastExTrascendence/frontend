"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import userSearchList from "@/ui/overview/topnavbar/topnav-mock";
import getSearchedUser from "@/api/getSearchedUser";
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
    console.log(searchQuery);
    console.log(res);
  };

  const handleBlur = () => {
    setQuery("");
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    setQuery(term);
    fetchSearchResults(term);
  }, 300);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        className="block h-[60px] w-[350px] rounded-[20px] bg-zinc-800 py-[9px] pl-10 text-2xl font-thin text-white outline-none outline-2 placeholder:text-stone-300 "
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
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-stone-300 peer-focus:text-gray-900" />

      {query && (
        <div className="absolute top-full mt-2 w-full bg-zinc-800">
          {userSearchList.map((result) => (
            <Link key={result.id} href={`/user/${result.id}`}>
              <div className="flex flex-row items-center justify-center ">
                <Image
                  className="h-[30px] w-[30px] items-center justify-center rounded-[32px] border-black border-opacity-50"
                  width={30}
                  height={30}
                  src={result.profile}
                  alt="profile"
                />
                <p className="block h-full w-full rounded-[32px] border-black border-opacity-50 p-2 text-white hover:bg-gray-100">
                  {result.id}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

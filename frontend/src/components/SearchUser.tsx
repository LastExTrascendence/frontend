import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";
import LoadingAnimation from "@/ui/loading-animation";
import userSearchList from "@/ui/overview/topnavbar/topnav-mock";
import ProfileImage from "@/ui/profile-image";
import { UserSearchResultDto } from "@/types/dto/user.dto";
import { axiosGetSearchResult } from "@/api/axios/axios.custom";
import getSearchedUser from "@/api/getSearchedUser";
import useDebounce from "@/hooks/useDebounce";
import { UserlistProps } from "@/lib/definitions";

export default function SearchUser({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const { debounce } = useDebounce();
  const searchBarRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(true);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (searchInput === "") {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    if (!dropdownPosition.top && !dropdownPosition.left) getDropdownPosition();
    if (searchInput !== "") debounce("search", updateUserSearchResult, 500);
  }, [searchInput]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchInput("");
        setSearchResults([]);
        setShowDropdown(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const updateUserSearchResult = async () => {
    if (searchInput === "") {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }
    const result = await axiosGetSearchResult(searchInput);
    setSearchResults(result);
    setIsLoading(false);
    console.log(result);
  };

  const getDropdownPosition = () => {
    if (searchBarRef.current) {
      const searchBarRect = searchBarRef.current.getBoundingClientRect();
      const dropdownTop = searchBarRect.top + searchBarRect.height + 5;
      const dropdownLeft = searchBarRect.left;
      setDropdownPosition({
        top: searchBarRef.current.offsetTop + 40,
        left: searchBarRef.current.offsetLeft,
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value.trim());
    setShowDropdown(true);
  };

  return (
    <div className="relative flex">
      <input
        className="h-[40px] w-[260px] rounded-[15px] bg-zinc-800 py-[9px] pl-10 text-2xl font-thin text-white outline-none outline-2 placeholder:text-stone-300 "
        placeholder={placeholder}
        onChange={handleOnChange}
        maxLength={12}
        ref={searchBarRef}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-stone-300 peer-focus:text-gray-900" />
      {showDropdown && isLoading ? (
        <DropdownStyled
          id="search-result"
          top={dropdownPosition.top}
          left={dropdownPosition.left}
        >
          <DropdownLoadingAnimationContainerStyled>
            <LoadingAnimation />
          </DropdownLoadingAnimationContainerStyled>
        </DropdownStyled>
      ) : (
        showDropdown &&
        searchResults.length > 0 && (
          <DropdownStyled
            id="search-result"
            top={dropdownPosition.top}
            left={dropdownPosition.left}
          >
            {searchResults.map((user: any) => (
              <DropdownItemStyled
                key={user.id}
                onClick={() => router.push(`/profile/${user.nickname}`)}
              >
                <UserImageContainerStyled>
                  <ProfileImage
                    src={user.avatar || "/default_profile.svg"}
                    width={40}
                    height={40}
                    borderRadius={100}
                    showOutline={true}
                  />
                </UserImageContainerStyled>
                <SearchItemRightStyled>
                  <NameContainerStyled>
                    <MemberNameStyled>{user.nickname}</MemberNameStyled>
                    <IntraNameStyled>{user.intra_name}</IntraNameStyled>
                  </NameContainerStyled>
                </SearchItemRightStyled>
              </DropdownItemStyled>
            ))}
          </DropdownStyled>
        )
      )}
      {/* {
        <div className="absolute top-full w-full bg-zinc-800">
          {userSearchList.map((result) => (
            <Link key={result.id} href={`/profile/${result.id}`}>
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
      } */}
    </div>
  );
}

const DropdownStyled = styled.div<{ top?: number; left?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 50%; */
  min-width: 260px;
  height: 160px;
  background-color: var(--input-container-color);
  border-radius: 20px;
  padding: 10px 0 10px 0;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 1;
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const DropdownLoadingAnimationContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const DropdownItemStyled = styled.div`
  height: 50px;
  min-height: 50px;
  display: flex;
  align-items: center;
  width: 90%;
  margin: 5px 0px 5px 0px;
  /* padding-bottom: 5px; */
  border-radius: 15px;
  background: var(--line-color-light-gray);
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const UserImageContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 100%;
    border: 1px solid var(--transparent);
    /* margin-right: 5px; */
  }
`;

const SearchItemRightStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

const NameContainerStyled = styled.div`
  width: 100%;
  font-weight: 500;
  padding-left: 2px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
`;

const MemberNameStyled = styled.div`
  cursor: pointer;
  font-size: 1.3rem;
  color: var(--white);
`;

const IntraNameStyled = styled.div`
  cursor: pointer;
  font-size: 1rem;
  color: var(--light-gray);
  transition: all 0.3s ease;
  &:hover {
    color: var(--white);
  }
`;

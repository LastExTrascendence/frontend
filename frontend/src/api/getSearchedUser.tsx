import { UserlistProps } from "@/lib/definitions";
import customFetch from "@/api/fetch/fetch";

export async function getSearchedUser(
  searchedUser: string,
): Promise<UserlistProps[]> {
  try {
    const response = await customFetch(`/user/search?query=${searchedUser}`);
    const data = await response.json();
    return data as UserlistProps[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default getSearchedUser;

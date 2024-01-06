import { HttpMethod } from "@/lib/definitions";

export default async function customFetch(
  url: string,
  method: HttpMethod = "GET",
  options: RequestInit = {},
) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_API_BASE_URI;
  if (!baseUrl) {
    throw new Error("SERVER_API_BASE_URI is not defined");
  }

  const requestOptions: RequestInit = {
    method,
    ...options,
  };

  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}${url}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => resolve({ success: data }))
      .catch((error) => reject(new Error(error.message)));
  });
}

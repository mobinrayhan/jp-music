import { getToken } from "../lib/localStorageToken";
import axiosInstance from "./axiosInstance";

export const getUsers = async ({ querySearch, page }) => {
  console.log(querySearch, page);

  const fetcherEndPoint = `/users/all?querySearch=${querySearch}&page=${page}`;
  const token = getToken();

  if (!token) {
    throw new Error("No Token Found");
  }

  try {
    const data = await axiosInstance.get(fetcherEndPoint, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "An error occurred while fetching audios.",
    );
  }
};

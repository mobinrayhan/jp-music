const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;

export const fetchWithApiKey = async (endpoint, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    ...options.headers,
  };

  if (options.jwt) {
    headers["Authorization"] = `Bearer ${options.jwt}`;
  }



  const response = await fetch(apiUrl + endpoint, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  return response.json();
};

export const fetcher = (endpoint, options) =>
  fetchWithApiKey(endpoint, options);

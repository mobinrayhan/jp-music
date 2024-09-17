const apiKey = process.env.API_KEY;

export const fetchWithApiKey = async (url, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

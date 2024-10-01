const apiKey = process.env.API_KEY; // Securely fetch from environment variables
const apiUrl = process.env.API_URL;

export const fetcher = async (endpoint, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": apiKey, // Add API key directly
    ...options.headers, // Merge with any additional headers passed in
  };

  const response = await fetch(apiUrl + endpoint, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

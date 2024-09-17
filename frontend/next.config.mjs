import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const config = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        API_KEY: "9c035862-3350-4204-9c87-0a65d5c7c85f",
      },
    };
  }

  return {
    env: {
      API_KEY: "9c035862-3350-4204-9c87-0a65d5c7c85f",
    },
  };
};

export default config;

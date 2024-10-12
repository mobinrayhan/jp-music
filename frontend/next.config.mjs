import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const config = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        API_KEY: "9c035862-3350-4204-9c87-0a65d5c7c85f",
        API_URL: "http://192.168.0.105:4000",
        JWT_SECRET: "jamesPrinceSoundei@147570",
        NEXTAUTH_SECRET:
          "ee0925e6c51c42692fb4cc34b166ae13e00a4d5b1355e7d0814900f7af617deas",
        // API_URL: "https://dev-api.soundei.com",
      },

      webpack(config) {
        config.module.rules.push({
          test: /\.(mp3|wav|ogg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                publicPath: "/_next/static/audio/",
                outputPath: "static/audio/",
                name: "[name].[hash].[ext]",
              },
            },
          ],
        });

        return config;
      },

      images: {
        remotePatterns: [
          {
            hostname: "localhost",
          },
          {
            hostname: "dev-api.soundei.com",
          },
          {
            hostname: "192.168.0.105",
          },
        ],
      },
    };
  }

  return {
    env: {
      NEXTAUTH_SECRET:
        "ee0925e6c51c42692fb4cc34b166ae13e00a4d5b1355e7d0814900f7af617deas",
      API_KEY: "9c035862-3350-4204-9c87-0a65d5c7c85f",
      // API_URL: "https://dev-api.soundei.com",
      JWT_SECRET: "jamesPrinceSoundei@147570",
      API_URL: "http://192.168.0.105:4000",
    },

    webpack(config) {
      config.module.rules.push({
        test: /\.(mp3|wav|ogg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/_next/static/audio/",
              outputPath: "static/audio/",
              name: "[name].[hash].[ext]",
            },
          },
        ],
      });

      return config;
    },

    images: {
      remotePatterns: [
        {
          hostname: "localhost",
        },
        {
          hostname: "dev-api.soundei.com",
        },
        {
          hostname: "192.168.0.105",
        },
      ],
    },
  };
};

export default config;

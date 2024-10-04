import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const config = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        API_KEY: "9c035862-3350-4204-9c87-0a65d5c7c85f",
        API_URL: "http://192.168.0.106:4000",
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
            hostname: "192.168.0.106",
          },
        ],
      },
    };
  }

  return {
    env: {
      API_KEY: "9c035862-3350-4204-9c87-0a65d5c7c85f",
      API_URL: "https://dev-api.soundei.com",
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
          hostname: "192.168.0.106",
        },
      ],
    },
  };
};

export default config;

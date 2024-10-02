import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const config = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        API_KEY: "9c035862-3350-4204-9c87-0a65d5c7c85f",
        API_URL: "http://192.168.0.104:4000",
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
            hostname: "jp-music.onrender.com",
          },
          {
            hostname: "192.168.0.104",
          },
        ],
      },
    };
  }

  return {
    env: {
      API_KEY: "9c035862-3350-4204-9c87-0a65d5c7c85f",
      API_URL: "https://jp-music.onrender.com",
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
          hostname: "jp-music.onrender.com",
        },
        {
          hostname: "192.168.0.104",
        },
      ],
    },
  };
};

export default config;

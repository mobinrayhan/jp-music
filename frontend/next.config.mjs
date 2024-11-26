import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const config = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        API_KEY: "9c035862-3350-4204-9c87-0a65d5c7c85f",
        API_URL: "http://localhost:4000",

        GOOGLE_CLIENT_ID:
          "850868314693-ejhssoibt9576bdg5fctt1lbrs3bdi9t.apps.googleusercontent.com",
        GOOGLE_CLIENT_SECRET: "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",

        FACEBOOK_CLIENT_ID: "920240496669188",
        FACEBOOK_CLIENT_SECRET: "710cdc53481e8d0420c37fdb4f6e602d",

        JWT_SECRET: "jamesPrinceSoundei@147570",
        NEXTAUTH_SECRET:
          "ee0925e6c51c42692fb4cc34b166ae13e00a4d5b1355e7d0814900f7af617deas",
        NEXTAUTH_URL: "http://localhost:3000",

        NEXT_PUBLIC_RECAPTCHA_SITE_KEY:
          "6LeDqHkqAAAAAJZf2kqnMNlkPpdqxYVOdPbp7iun",
        RECAPTCHA_SECRET_KEY: "6LeDqHkqAAAAAMrFuOz2IsC0t4zTrMWGRlYNLBD-",
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
            hostname: "192.168.0.107",
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

      GOOGLE_CLIENT_ID:
        "850868314693-ejhssoibt9576bdg5fctt1lbrs3bdi9t.apps.googleusercontent.com",
      GOOGLE_CLIENT_SECRET: "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",

      FACEBOOK_CLIENT_ID: "920240496669188",
      FACEBOOK_CLIENT_SECRET: "710cdc53481e8d0420c37fdb4f6e602d",

      JWT_SECRET: "jamesPrinceSoundei@147570",

      // API_URL: "https://vps-backend.soundei.com",
      // API_URL: "http://192.168.0.107:4000",
      API_URL: "http://localhost:4000",

      NEXTAUTH_URL: "http://192.168.0.107:3000",
      // NEXTAUTH_URL: "https://vps-front.soundei.com",
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
          hostname: "vps-backend.soundei.com",
        },
        {
          hostname: "192.168.0.107",
        },
      ],
    },
  };
};

export default config;

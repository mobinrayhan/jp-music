import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const config = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        API_KEY: "9c035862-3350-4204-9c87-0a65d5c7c85f",
        API_URL: "http://192.168.0.101:4000",
        GOOGLE_CLIENT_ID:
          "850868314693-ejhssoibt9576bdg5fctt1lbrs3bdi9t.apps.googleusercontent.com",
        GOOGLE_CLIENT_SECRET: "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",

        // FACEBOOK_CLIENT_ID: "1066993658214517",
        // FACEBOOK_CLIENT_SECRET: "fdf19632341e6a759555cfa121c64e9c",

        FACEBOOK_CLIENT_ID: "535353495947075",
        FACEBOOK_CLIENT_SECRET: "9926b82d87d3036c1d9c76944f4137a0",

        JWT_SECRET: "jamesPrinceSoundei@147570",
        NEXTAUTH_SECRET:
          "ee0925e6c51c42692fb4cc34b166ae13e00a4d5b1355e7d0814900f7af617deas",
        NEXTAUTH_URL: "http://localhost:3000",
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
            hostname: "192.168.0.101",
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

      FACEBOOK_CLIENT_ID: "535353495947075",
      FACEBOOK_CLIENT_SECRET: "9926b82d87d3036c1d9c76944f4137a0",

      JWT_SECRET: "jamesPrinceSoundei@147570",
      API_URL: "http://192.168.0.101:4000",
      NEXTAUTH_URL: "https://vps-front.soundei.com",
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
          hostname: "192.168.0.101",
        },
      ],
    },
  };
};

export default config;

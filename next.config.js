const { i18n } = require("./next-i18next.config");

const apiBaseUrl = "http://localhost:8002";

module.exports = {
  env: {
    app_name: "BazarBondhu",
    api_url: `${apiBaseUrl}/api/v2`,
    api_backend_url: `${apiBaseUrl}/api/v2/backend`,
    base_url: apiBaseUrl,
    mode: "development",
    passphrase: "dit",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  i18n,
  trailingSlash: true,
};

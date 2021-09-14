export const OWNER = "avatar-global";
export const REPOSITORY = "crystal-wsc91-2021-issues";
export const HOST = "https://api.github.com";
export const OPTIONS = {
  method: "get",
  headers: {
    authorization: `Bearer ${process.env.VUE_APP_ENV_TOKEN_GITHUB ||
      "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"}`,
    accept: "application/vnd.github.inertia-preview+json, vnd.github.v3+json",
  },
  muteHttpExceptions: true,
};

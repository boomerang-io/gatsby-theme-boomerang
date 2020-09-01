export const APP_ROOT =
  typeof window !== "undefined" && window._SERVER_DATA && window._SERVER_DATA.APP_ROOT
    ? window._SERVER_DATA.APP_ROOT
    : "";

import window from "window-or-global";

export const BASE_LAUNCH_ENV_URL =
  window._SERVER_DATA && window._SERVER_DATA.BASE_LAUNCH_ENV_URL
    ? window._SERVER_DATA.BASE_LAUNCH_ENV_URL
    : "http://localhost:8000";

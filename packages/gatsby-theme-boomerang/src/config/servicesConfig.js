import window from "window-or-global";
import axios from "axios";

const NODE_ENV = String(process.env.NODE_ENV);

const BASE_SERVICE_ENV_URL =
  NODE_ENV === "development" || NODE_ENV === "test"
    ? "/api"
    : window._SERVER_DATA && window._SERVER_DATA.BASE_SERVICE_ENV_URL;

export const BASE_SERVICE_USERS_URL = `${BASE_SERVICE_ENV_URL}/users`;
export const BASE_SERVICE_URL = BASE_SERVICE_ENV_URL;
export const BASE_SERVICE_PRODUCT_URL = `${BASE_SERVICE_ENV_URL}/launchpad`;

export const serviceUrl = {
  getClientNames: (args) => `${BASE_SERVICE_PRODUCT_URL}/client/cash/autocomplete/${args.query}`,
  getNavigation: () => `${BASE_SERVICE_USERS_URL}/navigation`,
  getUserProfile: () => `${BASE_SERVICE_USERS_URL}/profile`,
  getUserTeamsServices: () => `${BASE_SERVICE_ENV_URL}/users/teams/services`,
};

export const resolver = {
  query: (url) => () => axios.get(url).then((response) => response.data),
  postMutation: (request) => axios.post(request),
  patchMutation: (request) => axios.patch(request),
  putMutation: (request) => axios.put(request),
};

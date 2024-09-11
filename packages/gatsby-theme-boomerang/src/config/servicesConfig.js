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
export const BASE_SERVICE_ADMIN_URL = `${BASE_SERVICE_ENV_URL}/admin`;

export const serviceUrl = {
  getClientNames: (args) => `${BASE_SERVICE_PRODUCT_URL}/client/cash/autocomplete/${args.query}`,
  getNavigation: () => `${BASE_SERVICE_USERS_URL}/navigation`,
  getTeams: () => `${BASE_SERVICE_PRODUCT_URL}/teams`,
  getTeamsLabels: () => `${BASE_SERVICE_PRODUCT_URL}/teams/labels`,
  getUser: () => `${BASE_SERVICE_USERS_URL}/profile`,
  getUserJoinRequests: () => `${BASE_SERVICE_ADMIN_URL}/requests/joingroup/mine`,
  getUserProfile: () => `${BASE_SERVICE_USERS_URL}/profile`,
  getUserTeamsServices: () => `${BASE_SERVICE_ENV_URL}/users/teams/services`,
  getValidateOpportunityId: (args) =>
    `${BASE_SERVICE_PRODUCT_URL}/client/opportunity/${args.opportunityId}`,
  postCreateTeamRequest: () => `${BASE_SERVICE_ADMIN_URL}/requests/creategroup`,
  postJoinTeamRequest: () => `${BASE_SERVICE_ADMIN_URL}/multirequests/joingroup`,
};

export const resolver = {
  query: (url) => () => axios.get(url).then((response) => response.data),
  postMutation: (request) => axios.post(request),
  patchMutation: (request) => axios.patch(request),
  postCreateTeamRequest: ({ body }) =>
    cancelableResolver({ method: HTTPMethod.Post, url: serviceUrl.postCreateTeamRequest(), body }),
  postJoinTeamRequest: ({ body }) =>
    cancelableResolver({ method: HTTPMethod.Post, url: serviceUrl.postJoinTeamRequest(), body }),
  putMutation: (request) => axios.put(request),
};

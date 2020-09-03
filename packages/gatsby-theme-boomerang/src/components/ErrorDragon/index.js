import React from "react";
import { ErrorDragon } from "@boomerang-io/carbon-addons-boomerang-react";
import { BASE_LAUNCH_ENV_URL } from "@gatsby-theme-boomerang/config/platformUrlConfig";

function ErrorDragonComponent() {
  return <ErrorDragonComponent statusUrl={`${BASE_LAUNCH_ENV_URL}/status`} style={{ width: "100%" }} />;
}

export default ErrorDragon;

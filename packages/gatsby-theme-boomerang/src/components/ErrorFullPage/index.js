import React from "react";
import { ErrorFullPage } from "@boomerang-io/carbon-addons-boomerang-react";
import { BASE_LAUNCH_ENV_URL } from "@gatsby-theme-boomerang/config/platformUrlConfig";
import { container } from "./ErrorFullPage.module.scss";

function ErrorFullPageComponent(props) {
  return (
    <div className={container}>
      <ErrorFullPage statusUrl={`${BASE_LAUNCH_ENV_URL}/status`} {...props} />
    </div>
  );
}

export default ErrorFullPageComponent;

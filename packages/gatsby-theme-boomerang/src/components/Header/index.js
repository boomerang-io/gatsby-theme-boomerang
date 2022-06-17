/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { UIShell } from "@boomerang-io/carbon-addons-boomerang-react";
import { BASE_SERVICE_URL } from "@gatsby-theme-boomerang/config/servicesConfig";
import { BASE_LAUNCH_ENV_URL } from "@gatsby-theme-boomerang/config/platformUrlConfig";

const defaultUIShellProps = {
  baseServiceUrl: BASE_SERVICE_URL,
  renderLogo: false,
  baseLaunchEnvUrl: BASE_LAUNCH_ENV_URL,
};

const skipToContentProps = {
  href: "#content",
};

const defaultPlatformName = "IBM Consulting Essentials";

class Header extends Component {
  render() {
    const { navigation, user } = this.props;

    return (
      <>
        <UIShell
          {...defaultUIShellProps}
          headerConfig={navigation}
          user={user}
          renderLogo={navigation?.platform?.displayLogo}
          companyName={navigation?.platform?.platformName ?? defaultPlatformName}
          skipToContentProps={skipToContentProps}
        />
      </>
    );
  }
}

Header.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object
};

export default Header;

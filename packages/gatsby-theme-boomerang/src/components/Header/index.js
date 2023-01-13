/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { UIShell } from "@boomerang-io/carbon-addons-boomerang-react";
import { BASE_SERVICE_URL } from "@gatsby-theme-boomerang/config/servicesConfig";
import { BASE_LAUNCH_ENV_URL } from "@gatsby-theme-boomerang/config/platformUrlConfig";

const DEFAULT_PLATFORM_NAME = "IBM Consulting Essentials";

const defaultUIShellProps = {
  baseServicesUrl: BASE_SERVICE_URL,
  baseEnvUrl: BASE_LAUNCH_ENV_URL,
  platformName: DEFAULT_PLATFORM_NAME,
};

const skipToContentProps = {
  href: "#content",
};

class Header extends Component {
  render() {
    const { navigation, user } = this.props;
    if (navigation && user) {
      return (
        <div style={{ height: "3rem" }}>
          <UIShell config={navigation} user={user} skipToContentProps={skipToContentProps} />
        </div>
      );
    }
    return <UIShell {...defaultUIShellProps} />;
  }
}

Header.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
};

export default Header;

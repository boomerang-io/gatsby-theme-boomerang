/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
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

class Header extends Component {
  render() {
    const { navigation, user } = this.props;
    const title = `Docs | ${navigation?.platform?.platformName ?? "IBM Services Essentials"}`;
    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="title" content={title} />
        </Helmet>
        <UIShell
          {...defaultUIShellProps}
          headerConfig={navigation}
          user={user}
          renderLogo={navigation?.platform?.displayLogo}
          companyName={navigation?.platform?.platformName ?? "IBM Services Essentials"}
          skipToContentProps={skipToContentProps}
        />
      </>
    );
  }
}

Header.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
};

export default Header;

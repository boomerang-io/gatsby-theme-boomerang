/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { UIShell } from "@boomerang-io/carbon-addons-boomerang-react";
import Sidenav from "@gatsby-theme-boomerang/components/Header/Sidenav";
import { BASE_SERVICE_URL, resolver } from "@gatsby-theme-boomerang/config/servicesConfig";
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
    const { navigation, user, userTeams, queryClient, userTeamsError , userTeamsLoading } = this.props;
    if (navigation && user && userTeams) {
      const templateMeteringEvent = async ({ service, team }) => {
        await resolver.putMeteringEvent({ templateId: service.templateId, teamId: team.id });
      }

      return (
        <div style={{ height: "3rem" }}>
          <UIShell 
            config={{...navigation, features: {...navigation.features, "notificationsCount.enabled": true}}}
            user={user}
            skipToContentProps={skipToContentProps}
            templateMeteringEvent={templateMeteringEvent}
            userTeams={
              {
                data: navigation?.platform?.personalTeamEnabled ? userTeams : {...userTeams, personalTeam:[]}, 
                isLoading: userTeamsLoading, 
                error: userTeamsError
              }
            }
            leftPanel={({isOpen, navLinks}) => (
              <Sidenav
                isOpen={isOpen}
                navigation={navigation}
                user={user}
                userTeams={userTeams}
                navLinks={navLinks}
                queryClient={queryClient}
                userTeamsError={userTeamsError}
                userTeamsLoading={userTeamsLoading}
              />
            )}
          />
        </div>
      );
    }
    return <UIShell {...defaultUIShellProps} />;
  }
}

Header.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
  userTeams: PropTypes.object,
};

export default Header;

import React from "react";
import {
  AdvantageSideNav,
} from "@boomerang-io/carbon-addons-boomerang-react";
//@ts-ignore
import { CreateJoinTeam } from "@boomerang/core-lib-components";
import AutocompleteInput from "@gatsby-theme-boomerang/components/AutocompleteInput";
import * as Constants from "@gatsby-theme-boomerang/constants";
import * as Hooks from "@gatsby-theme-boomerang/hooks";
import { TeamTypes } from "@gatsby-theme-boomerang/constants";
import { resolver, serviceUrl } from "@gatsby-theme-boomerang/config/servicesConfig";

export function SidenavContainer({isOpen, user, navigation, navLinks, userTeams, queryClient}) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const standardTeams = userTeams?.standardTeams ?? [];
  const accountTeams = userTeams?.accountTeams ?? [];
  const personalTeams = userTeams?.personalTeams ?? [];

  const handleCreateJoinTeam = () => {
    queryClient.invalidateQueries(serviceUrl.getUserTeamsServices());
    setIsModalOpen(false);
  }
  
  return(
    <>
      <CreateJoinTeam
        appElement="#___gatsby"
        teamType={TeamTypes.STANDARD}
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        onCreateTeam={handleCreateJoinTeam}
        onJoinTeam={handleCreateJoinTeam}
        components={{AutocompleteInput}}
        constants={Constants}
        hooks={Hooks}
        resolver={resolver}
        serviceUrl={serviceUrl}
      />
      <AdvantageSideNav
        homeLink={`${navigation?.platform.baseEnvUrl}/launchpad`}
        //temporary url for tests
        assistantLink={`${navigation?.platform.baseEnvUrl}/curatorai/apps/ui/`}
        joinCreateTrigger={() => setIsModalOpen(true)}
        teams={standardTeams} 
        personalTeams={personalTeams}
        accounts={accountTeams}
        baseEnvUrl={navigation?.platform.baseEnvUrl} 
        app="launchpad" 
        isOpen={isOpen}
        navLinks={navLinks}
        user={user}
      />
    </>
  );
}

export default SidenavContainer;

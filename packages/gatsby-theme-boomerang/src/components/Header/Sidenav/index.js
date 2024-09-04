import React from "react";
import {
  AdvantageSideNav,
} from "@boomerang-io/carbon-addons-boomerang-react";
//@ts-ignore
import { CreateJoinTeam } from "@boomerang/core-lib-components";
import * as Components from "../../../components";
import * as Constants from "../../../constants";
import * as Hooks from "../../../hooks";
import { TeamTypes } from "../../../constants";
import { resolver, serviceUrl } from "../../../config/servicesConfig";

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
        teamType={TeamTypes.STANDARD}
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        onCreateTeam={handleCreateJoinTeam}
        onJoinTeam={handleCreateJoinTeam}
        components={Components}
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

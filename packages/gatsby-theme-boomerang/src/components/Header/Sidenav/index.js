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

  const newChatRedirect = () => `${BASE_LAUNCH_ENV_URL}/curatorai/apps/ui`;
  const standardTeams = userTeams?.standardTeams ?? [];
  const accountTeams = userTeams?.accountTeams ?? [];
  const personalTeam = userTeams?.personalTeam ?? [];
  const chatRequestPending =
    !user?.personalTeamAssistantsAccess &&
    (user?.hasPersonalTeam || (!user?.hasPersonalTeam && user?.hasOpenPersonalTeamRequest));

  const assistantLink =
    personalTeam.length > 0
      ? `${newChatRedirect()}/?teamName=${personalTeam[0].displayName || personalTeam[0].name}&teamId=${personalTeam[0].id}`
      : newChatRedirect();

  const handleCreateJoinTeam = async () => {
    await queryClient.invalidateQueries(serviceUrl.getUserTeamsServices());
    setIsModalOpen(false);
  };
  
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
        homeLink={`${navigation?.platform.baseEnvUrl}/launchpad/`}
        showChatTooltip={chatRequestPending}
        enableChatButton={user?.personalTeamAssistantsAccess}
        tooltipMessage={
          user?.personalTeamAssistantsAccessRequested || user?.hasOpenPersonalTeamRequest
            ? "Chat request is being reviewed. Please try again later."
            : "This button has been disabled until you add Consulting Assistants back to your personal workspace to use this feature. "
        }
        //temporary url for tests
        assistantLink={assistantLink}
        joinCreateTrigger={() => setIsModalOpen(true)}
        teams={standardTeams} 
        personalTeams={personalTeam}
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

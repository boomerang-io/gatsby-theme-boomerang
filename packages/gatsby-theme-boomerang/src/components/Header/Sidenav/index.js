import React from "react";
import {
  AdvantageSideNav,
} from "@boomerang-io/carbon-addons-boomerang-react";
//@ts-ignore
import { CreateJoinTeam } from "@boomerang/core-lib-components";
import AutocompleteInput from "@gatsby-theme-boomerang/components/AutocompleteInput";
import * as Constants from "@gatsby-theme-boomerang/constants";
import * as Hooks from "@gatsby-theme-boomerang/hooks";
import { TeamTypes, UserPlatformRole } from "@gatsby-theme-boomerang/constants";
import { resolver, serviceUrl } from "@gatsby-theme-boomerang/config/servicesConfig";

export function SidenavContainer({isOpen, user, navigation, navLinks, userTeams, queryClient, userTeamsError , userTeamsLoading }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const localUrl = "http://127.0.0.1:3000";
  const BASE_LAUNCH_ENV_URL =
  window._SERVER_DATA && window._SERVER_DATA.BASE_LAUNCH_ENV_URL ? window._SERVER_DATA.BASE_LAUNCH_ENV_URL : localUrl;
  const isPartner = user?.type === UserPlatformRole.Partner;

  const StartChatTooltips = {
    ChatPending:
      "Start a new chat requires a personal workspace which is being created, please refresh and try again later.",
    AssistantNotAvailable:
      "This button has been disabled until you add Consulting Assistants back to your personal workspace to use this feature.",
  };

  const newChatRedirect = () => `${BASE_LAUNCH_ENV_URL}/curatorai/apps/ui/new-chat/start-new-chat`;
  const standardTeams = userTeams?.standardTeams ?? [];
  const accountTeams = userTeams?.accountTeams ?? [];
  const personalTeam = userTeams?.personalTeam ?? [];
  const chatRequestPending =
    !isPartner &&
    !user?.personalTeamAssistantsAccess &&
    (user?.hasPersonalTeam || (!user?.hasPersonalTeam && user?.hasOpenPersonalTeamRequest));

  const firstTimeUser =
    !isPartner &&
    !user?.personalTeamAssistantsAccess &&
    !user?.personalTeamAssistantsAccessRequested &&
    !user?.hasPersonalTeam &&
    !user?.hasOpenPersonalTeamRequest;

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
        showChatTooltip={chatRequestPending || firstTimeUser}
        enableChatButton={user?.personalTeamAssistantsAccess}
        tooltipMessage={
          user?.personalTeamAssistantsAccessRequested || user?.hasOpenPersonalTeamRequest || firstTimeUser
            ? StartChatTooltips.ChatPending
            : StartChatTooltips.AssistantNotAvailable
        }
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
        userTeamsError={userTeamsError}
        userTeamsLoading={userTeamsLoading}
      />
    </>
  );
}

export default SidenavContainer;

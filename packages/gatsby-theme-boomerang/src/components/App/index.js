import React from "react";
import PropTypes from "prop-types";
import { AppContext } from "@gatsby-theme-boomerang/state";
import { useQuery, useQueryClient } from "react-query";
import { Error403, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import ErrorFullPage from "@gatsby-theme-boomerang/components/ErrorFullPage";
import PageContainer from "@gatsby-theme-boomerang/components/PageContainer";
import Header from "@gatsby-theme-boomerang/components/Header";
import { useSideNavScrollManager, useTracking } from "@gatsby-theme-boomerang/hooks";
import { UserPlatformRole } from "@gatsby-theme-boomerang/constants";
import { resolver, serviceUrl } from "@gatsby-theme-boomerang/config/servicesConfig";

const GET_USER_URL = serviceUrl.getUserProfile();
const GET_NAVIGATION_URL = serviceUrl.getNavigation();
const GET_USER_SERVICES_TEAMS_URL = serviceUrl.getUserTeamsServices();

export default function App({ children, location, isGaActive }) {
  useTracking(location, isGaActive);
  const [isSideNavMounted, setIsSideNavMounted] = React.useState(false);
  useSideNavScrollManager({ isSideNavMounted, location });
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: GET_USER_URL,
    queryFn: resolver.query(GET_USER_URL),
  });

  const navigationQuery = useQuery({
    queryKey: GET_NAVIGATION_URL,
    queryFn: resolver.query(GET_NAVIGATION_URL),
  });

  const teamsQuery = useQuery({
    queryKey: GET_USER_SERVICES_TEAMS_URL,
    queryFn: resolver.query(GET_USER_SERVICES_TEAMS_URL),
  });

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.newrelic) {
      if (userQuery.data) {
        const { id, hasConsented } = userQuery.data;
        if (hasConsented) {
          window.newrelic.setCustomAttribute("userId", id);
        }
      }
    }
    if (typeof window !== "undefined" && window._appInfo) {
      if (userQuery.data) {
        window._appInfo.attribute1 = userQuery.data?.id;
        window._appInfo.attribute2 = userQuery.data?.type;
        window._appInfo.attribute3 = userQuery.data?.teams?.length;
        window._appInfo.attribute4 = userQuery.data?.requestSummary?.submittedByUser;
        window._appInfo.attribute5 = userQuery.data?.firstLoginDate;
      }
    }
  }, [userQuery]);

  if (userQuery.isLoading || navigationQuery.isLoading) {
    return <Loading />;
  }

  if (userQuery.isError || navigationQuery.isError) {
    return (
      <>
        <Header />
        <ErrorFullPage />
      </>
    );
  }

  if (userQuery.data && navigationQuery.data && teamsQuery.data) {
    return (
      <AppContext.Provider
        value={{ 
          isSideNavMounted,
          setIsSideNavMounted,
          platformName: navigationQuery.data.platform.platformName,
          user: userQuery.data,
          navigation: navigationQuery.data,
        }}
      >
        <PageContainer>
          <Header 
            navigation={navigationQuery.data}
            user={userQuery.data}
            userTeams={teamsQuery.data}
            queryClient={queryClient}
            userTeamsError={Boolean(teamsQuery?.error)}
            userTeamsLoading={Boolean(teamsQuery?.isLoading)}
          />
          <Content user={userQuery.data}>{children}</Content>
        </PageContainer>
      </AppContext.Provider>
    );
  }

  return null;
}

function Content(props) {
  if (!Boolean(props.user?.hasConsented)) {
    return null;
  }

  if (props.user?.type === UserPlatformRole.Partner) {
    return <Error403 />;
  }

  return props.children;
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  isGaActive: PropTypes.bool,
  location: PropTypes.object.isRequired,
};

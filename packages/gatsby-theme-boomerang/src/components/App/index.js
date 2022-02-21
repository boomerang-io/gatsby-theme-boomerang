import React from "react";
import PropTypes from "prop-types";
import { AppContext } from "@gatsby-theme-boomerang/state";
import { useQuery } from "react-query";
import { Error403, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import ErrorFullPage from "@gatsby-theme-boomerang/components/ErrorFullPage";
import Header from "@gatsby-theme-boomerang/components/Header";
import { useSideNavScrollManager, useTracking } from "@gatsby-theme-boomerang/hooks";
import { UserPlatformRole } from "@gatsby-theme-boomerang/constants";
import { resolver, serviceUrl } from "@gatsby-theme-boomerang/config/servicesConfig";

const GET_USER_URL = serviceUrl.getUserProfile();
const GET_NAVIGATION_URL = serviceUrl.getNavigation();

export default function App({ children, location, isGaActive }) {
  useTracking(location, isGaActive);
  const [isSideNavMounted, setIsSideNavMounted] = React.useState(false);
  useSideNavScrollManager({ isSideNavMounted, location });

  const userQuery = useQuery({
    queryKey: GET_USER_URL,
    queryFn: resolver.query(GET_USER_URL),
  });

  const navigationQuery = useQuery({
    queryKey: GET_NAVIGATION_URL,
    queryFn: resolver.query(GET_NAVIGATION_URL),
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
        window._appInfo.attribute2 = userQuery.data?.email;
        window._appInfo.attribute3 = userQuery.data?.type;
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

  if (userQuery.data && navigationQuery.data) {
    return (
      <AppContext.Provider value={{ isSideNavMounted, setIsSideNavMounted }}>
        <Header navigation={navigationQuery.data} user={userQuery.data} />
        <Content user={userQuery?.data}>{children}</Content>
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

import React from "react";
import PropTypes from "prop-types";
import { AppContext } from "@gatsby-theme-boomerang/state";
import { useSideNavScrollManager } from "@gatsby-theme-boomerang/hooks";
import { useQuery } from "react-query";
import { Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import ErrorFullPage from "@gatsby-theme-boomerang/components/ErrorFullPage";
import Header from "@gatsby-theme-boomerang/components/Header";
import { resolver, serviceUrl } from "@gatsby-theme-boomerang/config/servicesConfig";

const GET_USER_URL = serviceUrl.getUserProfile();
const GET_NAVIGATION_URL = serviceUrl.getNavigation();

export default function App({ children, location }) {
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
        {children}
      </AppContext.Provider>
    );
  }

  return null;
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

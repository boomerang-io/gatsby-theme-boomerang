import React from "react";
import PropTypes from "prop-types";
import { AppContext } from "State";
import { useQuery } from "react-query";
import { Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import ErrorDragon from "Components/ErrorDragon";
import Header from "Components/Header";
import { resolver, serviceUrl } from "Config/servicesConfig";

Main.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

const GET_USER_URL = serviceUrl.getUserProfile();
const GET_NAVIGATION_URL = serviceUrl.getNavigation();

function Main({ children, location }) {
  const [isSideNavMounted, setIsSideNavMounted] = React.useState(false);

  const userQuery = useQuery({
    queryKey: GET_USER_URL,
    queryFn: resolver.query(GET_USER_URL),
  });

  const navigationQuery = useQuery({
    queryKey: GET_NAVIGATION_URL,
    queryFn: resolver.query(GET_NAVIGATION_URL),
  });

  React.useEffect(() => {
    if (typeof window !== `undefined` && window.newrelic) {
      if (userQuery.data) {
        const { id, hasConsented } = userQuery.data;
        if (hasConsented) {
          window.newrelic.setCustomAttribute("userId", id);
        }
      }
    }
  }, [userQuery]);

  if (userQuery.isFetching || navigationQuery.isFetching) {
    return <Loading />;
  }

  if (userQuery.isError || navigationQuery.isError) {
    return (
      <>
        <Header />
        <ErrorDragon />
      </>
    );
  }

  if (userQuery.data && navigationQuery.data) {
    return (
      <AppContext.Provider value={{ isSideNavMounted, setIsSideNavMounted }}>
        <Header navigation={navigationQuery.data} user={userQuery.data} />
        <SidebarScrollManager location={location} />
        {children}
      </AppContext.Provider>
    );
  }

  return null;
}

// Hacky function that renders nothing and just manages the scroll behavior of the sidenav
// Done here bc this component doesn't remount while the template pages do.

function SidebarScrollManager({ location }) {
  const { isSideNavMounted } = React.useContext(AppContext);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const tickingRef = React.useRef(false);

  function handleScroll() {
    if (!tickingRef.current) {
      window.requestAnimationFrame(() => {
        const sidebarRef = document.querySelector("#sidenav");
        setScrollPosition(sidebarRef.scrollTop);
        tickingRef.current = false;
      });

      tickingRef.current = true;
    }
  }
  /**
   * Add event listener for when the sidenav is mounted
   */
  React.useEffect(() => {
    const sidebarRef = document.querySelector("#sidenav");
    if (typeof window !== "undefined" && isSideNavMounted && sidebarRef) {
      sidebarRef.addEventListener("scroll", handleScroll);
    }

    return () => sidebarRef?.removeEventListener("scroll", handleScroll);
  }, [isSideNavMounted, location]);

  // Use layout effect here to prevent any flickering
  React.useLayoutEffect(() => {
    const sidebarRef = document.querySelector("#sidenav");
    if (typeof window !== "undefined" && isSideNavMounted && sidebarRef) {
      sidebarRef.scrollTop = scrollPosition;
    }
  }, [location, isSideNavMounted, scrollPosition]);

  React.useLayoutEffect(() => {
    const sidebarRef = document.querySelector("#sidenav");
    const activeElementRef = document.querySelector("#active-sidenav-page-link");

    if (
      sidebarRef &&
      activeElementRef &&
      activeElementRef.getBoundingClientRect().bottom - 48 >= sidebarRef.offsetHeight
    ) {
      activeElementRef.scrollIntoView();
    }
  }, [isSideNavMounted]);

  return null;
}

export default Main;

import React from "react";

/**
 * Hook to scroll sidenav in to place after change, relies on element ids bleh
 * I would hope there is a simpler solution than this, but that is what I have come up with and it works so
 * ¯\_(ツ)_/¯
 *
 * @param {boolean} isSideNavMounted
 * @param {object} location
 */
export default function useSidebarScrollManager({ isSideNavMounted, location }) {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const tickingRef = React.useRef(false);

  // Track scrolling position
  function handleScroll() {
    if (!tickingRef.current) {
      window.requestAnimationFrame(() => {
        const sideNav = document.querySelector("#sidenav");
        setScrollPosition(sideNav.scrollTop);
        tickingRef.current = false;
      });

      tickingRef.current = true;
    }
  }

  // Add event listener for when the sidenav is mounted
  React.useEffect(() => {
    const sideNav = document.querySelector("#sidenav");
    if (typeof window !== "undefined" && isSideNavMounted && sideNav) {
      sideNav.addEventListener("scroll", handleScroll);
    }

    return () => sideNav?.removeEventListener("scroll", handleScroll);
  }, [isSideNavMounted, location]);

  // Use layout effect here to prevent flickering
  React.useLayoutEffect(() => {
    const sideNav = document.querySelector("#sidenav");
    if (typeof window !== "undefined" && isSideNavMounted && sideNav) {
      sideNav.scrollTop = scrollPosition;
    }
  }, [location, isSideNavMounted, scrollPosition]);

  // Scroll into view the sidenav if its below the fold on initial load
  React.useLayoutEffect(() => {
    const sideNav = document.querySelector("#sidenav");
    const activeElementRef = document.querySelector("#active-sidenav-page-link");

    if (sideNav && activeElementRef && activeElementRef.getBoundingClientRect().bottom - 48 >= sideNav.offsetHeight) {
      activeElementRef.scrollIntoView();
    }
  }, [isSideNavMounted]);
}

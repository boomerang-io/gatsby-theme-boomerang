import React from "react";
import PropTypes from "prop-types";
import { AppContext } from "@gatsby-theme-boomerang/state";
import { useSideNavScrollManager } from "@gatsby-theme-boomerang/hooks";
import { useTracking } from "@gatsby-theme-boomerang/hooks";
import { UIShell } from "@boomerang-io/carbon-addons-boomerang-react";

const skipToContentProps = {
  href: "#content",
};

export default function StandaloneApp({ children, location, navLinks, uiShellProductName, isGaActive }) {
  useTracking(location, isGaActive);
  const [isSideNavMounted, setIsSideNavMounted] = React.useState(false);
  useSideNavScrollManager({ isSideNavMounted, location });

  return (
    <AppContext.Provider value={{ isSideNavMounted, setIsSideNavMounted }}>
      <UIShell
        renderLogo
        headerConfig={{ navigation: navLinks }}
        productName={uiShellProductName}
        skipToContentProps={skipToContentProps}
      />
      {children}
    </AppContext.Provider>
  );
}

StandaloneApp.propTypes = {
  children: PropTypes.node.isRequired,
  isGaActive: PropTypes.bool,
  location: PropTypes.object.isRequired,
  navLinks: PropTypes.array,
  uiShellProductName: PropTypes.string,
};

import React from "react";
import PropTypes from "prop-types";
import { AppContext } from "@gatsby-theme-boomerang/state";
import { useSideNavScrollManager } from "@gatsby-theme-boomerang/hooks";
import { UIShell } from "@boomerang-io/carbon-addons-boomerang-react";

const skipToContentProps = {
  href: "#content",
};

export default function StandaloneApp({ children, location, navLinks, title }) {
  const [isSideNavMounted, setIsSideNavMounted] = React.useState(false);
  useSideNavScrollManager({ isSideNavMounted, location });

  return (
    <AppContext.Provider value={{ isSideNavMounted, setIsSideNavMounted }}>
      <UIShell
        headerConfig={{ navigation: navLinks }}
        productName={title}
        renderLogo
        skipToContentProps={skipToContentProps}
      />
      {children}
    </AppContext.Provider>
  );
}

StandaloneApp.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  navLinks: PropTypes.array,
  title: PropTypes.string,
};

import React from "react";
import PropTypes from "prop-types";
import { AppContext } from "State";
import { useSideNavScrollManager } from "Hooks";
import { Helmet } from "react-helmet";
import { UIShell } from "@boomerang-io/carbon-addons-boomerang-react";

const skipToContentProps = {
  href: "#content",
};

export default function StandaloneApp({ children, location, navLinks, title }) {
  const [isSideNavMounted, setIsSideNavMounted] = React.useState(false);
  useSideNavScrollManager({ isSideNavMounted, location });
  const resolvedTitle = title ?? "Docs | Boomerang";

  return (
    <AppContext.Provider value={{ isSideNavMounted, setIsSideNavMounted }}>
      <Helmet>
        <title>{resolvedTitle}</title>
        <meta name="title" content={resolvedTitle} />
      </Helmet>
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

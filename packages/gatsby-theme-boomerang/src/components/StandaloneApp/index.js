import React from "react";
import PropTypes from "prop-types";
import PageContainer from "@gatsby-theme-boomerang/components/PageContainer";
import { AppContext } from "@gatsby-theme-boomerang/state";
import { useSideNavScrollManager } from "@gatsby-theme-boomerang/hooks";
import { useTracking } from "@gatsby-theme-boomerang/hooks";
import { UIShell } from "@boomerang-io/carbon-addons-boomerang-react";

const skipToContentProps = {
  href: "#content",
};

export default function StandaloneApp({
  children,
  location,
  navLinks,
  uiShellPlatformName,
  uiShellProductName,
  isGaActive,
}) {
  useTracking(location, isGaActive);
  const [isSideNavMounted, setIsSideNavMounted] = React.useState(false);
  useSideNavScrollManager({ isSideNavMounted, location });

  return (
    <PageContainer>
      <AppContext.Provider value={{ isSideNavMounted, setIsSideNavMounted }}>
        <div style={{ height: "3rem" }}>
          <UIShell
            config={{ navigation: navLinks, platform: { platformName: uiShellPlatformName } }}
            productName={uiShellProductName}
            skipToContentProps={skipToContentProps}
          />
        </div>
        {children}
      </AppContext.Provider>
    </PageContainer>
  );
}

StandaloneApp.propTypes = {
  children: PropTypes.node.isRequired,
  isGaActive: PropTypes.bool,
  location: PropTypes.object.isRequired,
  navLinks: PropTypes.array,
  uiShellProductName: PropTypes.string,
};

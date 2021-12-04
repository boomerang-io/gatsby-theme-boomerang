import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { ErrorBoundary } from "@boomerang-io/carbon-addons-boomerang-react";
import PageContainer from "@gatsby-theme-boomerang/components/PageContainer";
import ErrorFullPage from "@gatsby-theme-boomerang/components/ErrorFullPage";
import App from "@gatsby-theme-boomerang/components/App";
import StandaloneApp from "@gatsby-theme-boomerang/components/StandaloneApp";
import { startApiServer } from "../apiServer";
import "typeface-ibm-plex-sans";
import "@gatsby-theme-boomerang/styles/index.scss";

if (process.env.NODE_ENV === "development") {
  startApiServer({ environment: "development", timing: 400 });
}

export default function index({ location, children }) {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line global-require
    require("smooth-scroll")('a[href*="#"]', { speed: 200, offset: 70 });
  }
  return (
    <ErrorBoundary errorComponent={() => <ErrorFullPage style={{ marginTop: "10rem" }} />}>
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                title
                description
                socialLinks {
                  github
                  twitter
                }
                standaloneMode
                isGaActive
                uiShellProductName
                navLinks {
                  name
                  url
                }
              }
            }
          }
        `}
        render={(data) => {
          const { navLinks, standaloneMode, uiShellProductName, isGaActive } = data.site.siteMetadata;
          return (
            <PageContainer siteMetadata={data.site.siteMetadata}>
              {standaloneMode ? (
                <StandaloneApp
                  location={location}
                  navLinks={navLinks}
                  uiShellProductName={uiShellProductName}
                  isGaActive={isGaActive}
                >
                  {children}
                </StandaloneApp>
              ) : (
                <App location={location} isGaActive={isGaActive}>
                  {children}
                </App>
              )}
            </PageContainer>
          );
        }}
      />
    </ErrorBoundary>
  );
}

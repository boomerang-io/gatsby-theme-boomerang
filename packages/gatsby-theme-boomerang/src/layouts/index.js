import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { ErrorBoundary } from "@boomerang-io/carbon-addons-boomerang-react";
import ErrorDragon from "Components/ErrorDragon";
import App from "Components/App";
import StandaloneApp from "Components/StandaloneApp";
import { startApiServer } from "../apiServer";
import "typeface-ibm-plex-sans";
import "Styles/index.scss";

if (process.env.NODE_ENV === "development") {
  startApiServer({ environment: "development", timing: 400 });
}

export default function index({ location, children }) {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line global-require
    require("smooth-scroll")('a[href*="#"]', { speed: 200, offset: 70 });
  }
  return (
    <ErrorBoundary errorComponent={ErrorDragon}>
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                title
                standaloneMode
                navLinks {
                  name
                  url
                }
              }
            }
          }
        `}
        render={(data) => {
          const { navLinks, standaloneMode, title } = data.site.siteMetadata;
          return standaloneMode ? (
            <StandaloneApp location={location} navLinks={navLinks} title={title}>
              {children}
            </StandaloneApp>
          ) : (
            <App location={location} title={title}>
              {children}
            </App>
          );
        }}
      />
    </ErrorBoundary>
  );
}

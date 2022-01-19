import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { QueryClient, QueryClientProvider } from "react-query";
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

const queryClient = new QueryClient();

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
                description
                isGaActive
                standaloneMode
                title
                uiShellProductName
                navLinks {
                  name
                  url
                }
                socialLinks {
                  github
                  twitter
                }
              }
            }
          }
        `}
        render={(data) => {
          const { isGaActive, navLinks, standaloneMode, uiShellProductName } = data.site.siteMetadata;
          return (
            <PageContainer siteMetadata={data.site.siteMetadata}>
              {standaloneMode ? (
                <StandaloneApp
                  isGaActive={isGaActive}
                  location={location}
                  navLinks={navLinks}
                  uiShellProductName={uiShellProductName}
                >
                  {children}
                </StandaloneApp>
              ) : (
                <QueryClientProvider client={queryClient}>
                  <App isGaActive={isGaActive} location={location}>
                    {children}
                  </App>
                </QueryClientProvider>
              )}
            </PageContainer>
          );
        }}
      />
    </ErrorBoundary>
  );
}

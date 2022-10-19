import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { QueryClient, QueryClientProvider } from "react-query";
import { Theme as GlobalTheme } from "@carbon/react";
import { ErrorBoundary } from "@boomerang-io/carbon-addons-boomerang-react";
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

export default function Main({ location, children }) {
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
                isGaActive
                standaloneMode
                uiShellProductName
                theme
                navLinks {
                  name
                  url
                }
              }
            }
          }
        `}
        render={(data) => {
          return (
            <AppMode siteMetadata={data.site.siteMetadata} location={location}>
              {children}
            </AppMode>
          );
        }}
      />
    </ErrorBoundary>
  );
}

AppMode.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object,
  siteMetadata: PropTypes.object,
}

function AppMode(props) {
  const { isGaActive, navLinks, standaloneMode, uiShellProductName, theme } = props.siteMetadata;

  React.useEffect(() => {
    document.documentElement.setAttribute("data-carbon-theme", theme);
  }, [theme]);

  return (
    <GlobalTheme>
      {standaloneMode ? (
        <StandaloneApp
          isGaActive={isGaActive}
          location={props.location}
          navLinks={navLinks}
          uiShellProductName={uiShellProductName}
        >
          {props.children}
        </StandaloneApp>
      ) : (
        <QueryClientProvider client={queryClient}>
          <App isGaActive={isGaActive} location={props.location} theme={theme}>
            {props.children}
          </App>
        </QueryClientProvider>
      )}
    </GlobalTheme>
  );
}

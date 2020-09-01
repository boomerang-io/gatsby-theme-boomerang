import React from "react";
import { ErrorBoundary } from "@boomerang-io/carbon-addons-boomerang-react";
import ErrorDragon from "Components/ErrorDragon";
import Main from "Components/Main";
import "typeface-ibm-plex-sans";
import "Styles/index.scss";

export default function index({ location, children }) {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line global-require
    require("smooth-scroll")('a[href*="#"]', { speed: 200, offset: 70 });
  }
  return (
    <ErrorBoundary errorComponent={ErrorDragon}>
      <Main location={location}>{children}</Main>
    </ErrorBoundary>
  );
}

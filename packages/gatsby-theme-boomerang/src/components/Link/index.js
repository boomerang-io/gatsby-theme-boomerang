import React from "react";
import { Link as GatsbyLink } from "gatsby";
// eslint-disable-next-line import/no-unresolved
import { APP_ROOT } from "@gatsby-theme-boomerang/config/appConfig";
import isAbsoluteUrl from "is-absolute-url";

const Link = ({ children, to, ...props }) =>
  isAbsoluteUrl(to) ? (
    <a href={to} {...props}>
      {children}
    </a>
  ) : (
    <GatsbyLink to={`${APP_ROOT}${to}`} {...props}>
      {children}
    </GatsbyLink>
  );

export default Link;

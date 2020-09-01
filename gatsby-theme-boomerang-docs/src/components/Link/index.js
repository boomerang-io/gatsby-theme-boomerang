import React from "react";
import { Link as GatsbyLink } from "gatsby";
import isAbsoluteUrl from "is-absolute-url";

const Link = ({ children, to, ...props }) =>
  isAbsoluteUrl(to) ? (
    <a href={to} {...props}>
      {children}
    </a>
  ) : (
    <GatsbyLink to={to} {...props}>
      {children}
    </GatsbyLink>
  );

export default Link;

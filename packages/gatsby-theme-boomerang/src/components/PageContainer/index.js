import React from "react";
import { Helmet } from "react-helmet";

export default function PageContainer({ children, title }) {
  const resolvedTitle = title ? `${title} | Boomerang` : "Boomerang";
  return (
    <>
      <Helmet>
        <title>{resolvedTitle}</title>
        <meta name="title" content={resolvedTitle} />
      </Helmet>
      <div id="content">{children}</div>
    </>
  );
}

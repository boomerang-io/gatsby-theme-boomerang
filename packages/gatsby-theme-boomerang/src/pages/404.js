import React from "react";
import PageContainer from "@gatsby-theme-boomerang/components/PageContainer";
import { Error404 } from "@boomerang-io/carbon-addons-boomerang-react";

export default function FourOhFour() {
  return (
    <PageContainer siteMetadata={{ title: "404 - Not Found" }}>
      <Error404 />;
    </PageContainer>
  );
}

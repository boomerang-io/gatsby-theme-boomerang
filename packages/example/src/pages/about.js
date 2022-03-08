import React from "react";
import PageContainer from "@boomerang-io/gatsby-theme-boomerang/src/components/PageContainer";

export default function About() {
  return (
    <PageContainer siteMetadata={{ title: "About" }}>
      <h1>About Page!</h1>
      <p>Some content about the about page</p>
    </PageContainer>
  );
}

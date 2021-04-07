import React from "react";
import { Helmet } from "react-helmet";
import Boomerang from "./boomerang.png";

export default function PageContainer({ children, siteMetadata = {} }) {
  const resolvedTitle = siteMetadata?.title ? `${siteMetadata?.title} | IBM Services Essentials` : "IBM Services Essentials";
  return (
    <>
      <SEO description={siteMetadata.description} title={resolvedTitle} socialLinks={siteMetadata.socialLinks} />
      {children}
    </>
  );
}

export const SEO = ({ description, title, location = "", socialLinks = {} }) => (
  <Helmet>
    <html lang="en" dir="ltr" />
    <meta name="description" content={description} />
    <meta name="image" content={Boomerang} />

    <meta property="og:url" content={location} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={Boomerang} />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content={socialLinks.twitter} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={Boomerang} />
    <link rel="publisher" href={socialLinks.google} />
    <title>{title}</title>
  </Helmet>
);

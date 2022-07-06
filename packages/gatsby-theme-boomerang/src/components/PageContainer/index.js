import React from "react";
import { Helmet } from "react-helmet";
import { AppContext } from "@gatsby-theme-boomerang/state";
import Boomerang from "./boomerang.png";
import { StaticQuery, graphql } from "gatsby";

export default function PageContainer({ children, slug = "", siteMetadata = {} }) {
  const appContext = React.useContext(AppContext);
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
              platformName
              siteUrl
              socialLinks {
                github
                twitter
              }
            }
          }
        }
      `}
      render={(data) => {
        const resolvedMetadata = {
          ...data.site.siteMetadata,
          ...siteMetadata,
        };

        const { title } = resolvedMetadata;
        const platformName = resolvedMetadata.platformName || appContext.platformName;
        const fullTitle = resolvedMetadata.title ? `${title} - ${platformName}` : platformName;

        return (
          <>
            <SEO
              description={resolvedMetadata.description}
              socialLinks={resolvedMetadata.socialLinks}
              title={fullTitle}
              url={`${resolvedMetadata.siteUrl}${slug}`}
            />
            {children}
          </>
        );
      }}
    />
  );
}

function SEO({ description, socialLinks = {}, imageURL, twitterImagURL, title, url = "" }) {
  return (
    <Helmet>
      <html lang="en" dir="ltr" />
      <meta name="description" content={description} />
      <meta name="image" content={Boomerang} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageURL ?? Boomerang} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={socialLinks.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImagURL ?? Boomerang} />
      <link rel="publisher" href={socialLinks.google} />
      <title>{title}</title>
    </Helmet>
  );
}

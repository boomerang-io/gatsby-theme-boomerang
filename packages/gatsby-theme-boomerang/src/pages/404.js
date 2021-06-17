import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
// eslint-disable-next-line import/no-unresolved
import { navigate } from "@reach/router";
// eslint-disable-next-line import/no-unresolved
import PageContainer from "@gatsby-theme-boomerang/components/PageContainer";
// eslint-disable-next-line import/no-unresolved
import { APP_ROOT } from "@gatsby-theme-boomerang/config/appConfig";
import { Error404, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import semver from "semver";

const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        docsContext
      }
    }
    allMarkdownRemark {
      edges {
        node {
          fields {
            category
            solution
            title
            slug
            version
          }
        }
      }
    }
  }
`;

export default function FourOhFour({ location }) {
  const [isLoading, setIsLoading] = useState(true);
  const {
    site: {
      siteMetadata: { docsContext },
    },
    allMarkdownRemark: { edges: docNodes },
  } = useStaticQuery(pageQuery);

  const { pathname: pagePathname } = location;

  useEffect(() => {
    /**
     * Find doc with corresponding config path
     * and redirect to correct path with latest version
     */
    const checkedDocIds = [];
    const docFound = docNodes.some(({ node }) => {
      const docId = `${node.fields.category}-${node.fields.solution}-${node.fields.title}`;
      const pathToDoc = node.fields.slug ? docsContext + node.fields.slug : "/";
      const docConfigPath = pathToDoc.replace(`/${node.fields.version}`, "");

      if (!checkedDocIds.includes(docId)) {
        checkedDocIds.push(docId);

        if (pagePathname.includes(docConfigPath)) {
          const allVersionsOfDoc = [];
          docNodes.forEach(({ node: comparisonNode }) => {
            if (
              comparisonNode.fields.category === node.fields.category &&
              comparisonNode.fields.solution === node.fields.solution &&
              comparisonNode.fields.title === node.fields.title
            ) {
              allVersionsOfDoc.push({
                docId,
                version: comparisonNode.fields.version,
                slug: comparisonNode.fields.slug,
              });
            }
          });
          const semVersions = allVersionsOfDoc.map((nodes) => nodes.version);
          const latestVersion = semVersions.sort(semver.rcompare)[0];
          const latestDoc = allVersionsOfDoc.find((doc) => doc.version === latestVersion);
          const pathToLatestDoc = latestDoc.slug ? docsContext + latestDoc.slug : "/";
          navigate(`${APP_ROOT}${pathToLatestDoc}`);
          return true;
        }
      }

      return false;
    });

    if (!docFound) setIsLoading(false);
  }, [docNodes, docsContext, pagePathname]);

  return isLoading ? (
    <Loading />
  ) : (
    <PageContainer siteMetadata={{ title: "404 - Not Found" }}>
      <Error404 />;
    </PageContainer>
  );
}

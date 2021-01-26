/* eslint-disable react/no-danger */
import React from "react";
import { graphql } from "gatsby";
import Link from "@gatsby-theme-boomerang/components/Link";
import NextPrevious from "@gatsby-theme-boomerang/components/NextPrevious";
import sortBy from "lodash.sortby";
import moment from "moment";
import PageContainer from "@gatsby-theme-boomerang/components/PageContainer";
import { Launch16 } from "@carbon/icons-react";
import Layout from "./Layout";
import styles from "./Docs.module.scss";

export default function DocTemplate(props) {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const anchor = window.location.hash;
      if (anchor) {
        // eslint-disable-next-line global-require
        const SmoothScroll = require("smooth-scroll");
        const scroll = new SmoothScroll();
        const element = document.querySelector(anchor);
        if (element) {
          scroll.animateScroll(element, 0, { speed: 200, offset: 70 });
        }
      }
    }
  }, []);

  const {
    allMarkdownRemark,
    markdownRemark,
    site: {
      siteMetadata: { docsContext, docsLocation, solutions: solutionConfigList },
    },
  } = props.data;

  const solutionConfig = solutionConfigList.find(
    (productConfig) => productConfig.solution === markdownRemark.fields.solution
  );

  const solutionTitle = solutionConfig?.title;
  const productCategoryOrder = solutionConfig?.categoryOrder;
  let docNodes = allMarkdownRemark.edges.map(({ node }) => node);

  /**
   * if user provides a category order for the docs, use it to sort the nodes
   * they should already be sorted by the query so it is not necessary to do it again
   */
  if (Array.isArray(productCategoryOrder)) {
    docNodes = sortBy(docNodes, [
      (node) =>
        productCategoryOrder.indexOf(node.fields.category) !== -1
          ? productCategoryOrder.indexOf(node.fields.category)
          : Number.MAX_SAFE_INTEGER,
    ]);
  }

  const nav = docNodes.map((node) => ({
    title: node.fields.title,
    url: docsContext + node.fields.slug,
  }));

  return (
    <Layout
      docNodes={docNodes}
      location={props.location}
      pageContext={props.pageContext}
      solutionTitle={solutionTitle}
      siteMetadata={props.data.site.siteMetadata}
    >
      <PageContainer
        siteMetadata={{ ...props.data.site.siteMetadata, title: `${markdownRemark.fields.title} | ${solutionTitle}` }}
      >
        <article className={styles.container}>
          <div className={styles.metadata}>
            <span>
              Last upated: <time>{moment.unix(markdownRemark.fields.updatedAt).format("MMM DD, YYYY")}</time>
            </span>
            <span>{`Version: ${markdownRemark.fields.version}`}</span>
            <Link
              aria-describedby="new-window-aria-desc-0"
              className={styles.gitHubLink}
              target="_blank"
              rel="nofollow noopener"
              to={`${docsLocation}/${markdownRemark.parent.relativePath}`}
            >
              Edit on GitHub <Launch16 />
            </Link>
          </div>
          <div
            aria-label="Document content"
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
          />
          <footer className={styles.nextPreviousContainer}>
            <NextPrevious docsContext={docsContext} markdownRemark={markdownRemark} nav={nav} />
          </footer>
        </article>
      </PageContainer>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!, $solution: String!, $version: String!) {
    site {
      pathPrefix
      siteMetadata {
        docsContext
        docsLocation
        siteUrl
        title
        socialLinks {
          github
          twitter
        }
        solutions {
          title
          solution
          categoryOrder
        }
      }
    }
    markdownRemark(fields: { id: { eq: $id } }) {
      fields {
        id
        slug
        updatedAt
        title
        solution
        version
        category
      }
      html
      parent {
        ... on File {
          relativePath
        }
      }
    }
    allMarkdownRemark(
      filter: { fields: { solution: { eq: $solution }, version: { eq: $version } } }
      sort: { fields: [fields___category, fields___title], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
            title
            solution
            version
            category
          }
          headings {
            value
            depth
          }
        }
      }
    }
  }
`;

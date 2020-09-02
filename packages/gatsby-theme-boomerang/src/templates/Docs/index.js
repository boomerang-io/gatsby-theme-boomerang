/* eslint-disable react/no-danger */
import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Link from "Components/Link";
import NextPrevious from "Components/NextPrevious";
import sortBy from "lodash.sortby";
import moment from "moment";
import gitHubIcon from "Assets/svg/github.svg";
import Layout from "./Layout";
import styles from "./Docs.module.scss";

export default function DocTemplate(props) {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line global-require
      const SmoothScroll = require("smooth-scroll");
      const anchor = window.location.hash && document.querySelector(window.location.hash);
      if (anchor) {
        const scroll = new SmoothScroll();
        scroll.animateScroll(anchor, 0, { speed: 200, offset: 70 });
      }
    }
  }, []);

  const {
    allMarkdownRemark,
    markdownRemark,
    pathPrefix,
    site: {
      siteMetadata: { docsLocation, solutions: productConfigs, siteUrl },
    },
  } = props.data;

  const solutionConfig = productConfigs.find(
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
    url: node.fields.slug,
  }));

  // meta tags
  const docTitle = markdownRemark.fields.title;
  let canonicalUrl = siteUrl;
  canonicalUrl = pathPrefix !== "/" ? canonicalUrl + pathPrefix : canonicalUrl;
  canonicalUrl += markdownRemark.fields.slug;

  return (
    <Layout docNodes={docNodes} location={props.location} pageContext={props.pageContext} solutionTitle={solutionTitle}>
      <Helmet>
        <title>{`${docTitle} | ${solutionTitle} `}</title>
        <meta name="title" content={docTitle} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <article className={styles.container}>
        <header>
          <div className={styles.editContainer}>
            <Link
              title="Opens in new link"
              className={styles.gitHubLink}
              target="_blank"
              rel="nofollow noopener"
              to={`${docsLocation}/${markdownRemark.parent.relativePath}`}
            >
              <img src={gitHubIcon} alt="Github logo" style={{ height: "1rem" }} /> Edit
            </Link>
          </div>
          <div className={styles.metadata}>
            <span>
              Last upated: <time>{moment.unix(markdownRemark.fields.updatedAt).format("MMM DD, YYYY")}</time>
            </span>
            <span>{`Version: ${markdownRemark.fields.version}`}</span>
          </div>
        </header>
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        <footer className={styles.nextPreviousContainer}>
          <NextPrevious markdownRemark={markdownRemark} nav={nav} />
        </footer>
      </article>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!, $solution: String!, $version: String!) {
    site {
      pathPrefix
      siteMetadata {
        docsLocation
        siteUrl
        title
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
      sort: { fields: [fields___category, fields___index], order: ASC }
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

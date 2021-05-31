/* eslint-disable import/no-unresolved */
import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import semver from "semver";
import cx from "classnames";
import PageContainer from "@gatsby-theme-boomerang/components/PageContainer";
import DocsSearch from "@gatsby-theme-boomerang/components/DocsSearch";
import Footer from "@gatsby-theme-boomerang/components/Footer";
import { ContentLabels, contentLabelsToImageMap } from "@gatsby-theme-boomerang/constants";
import { ArrowRight24, Launch24 } from "@carbon/icons-react";
import * as styles from "./styles/Home.module.scss";

const pageQuery = graphql`
  query {
    site {
      pathPrefix
      siteMetadata {
        docsContext
        docsLocation
        siteUrl
        title
        description
        socialLinks {
          github
          twitter
        }
        footerLinksConfig {
          link
          title
          type
        }
        homeTitle
        homeDescription
        linksConfig {
          title
          links {
            title
            description
            path
            image
          }
        }
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

// Using a static query so it can be imported in Gatsby and rendered as page on a different path
// Allows shadowing of the index to be something else if desired

function Home() {
  const {
    site: { siteMetadata },
    allMarkdownRemark: { edges: docNodes },
  } = useStaticQuery(pageQuery);

  /**
   * Get latest versions of each doc
   * so we can get the path with the version
   */
  const latestDocVersions = [];
  docNodes.forEach(({ node }) => {
    const docId = `${node.fields.category}-${node.fields.solution}-${node.fields.title}`;

    if (!latestDocVersions.find((doc) => doc.docId === docId)) {
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
      const pathToLatestDoc = latestDoc.slug ? siteMetadata.docsContext + latestDoc.slug : "/";

      latestDoc.path = pathToLatestDoc;
      latestDoc.configPath = pathToLatestDoc.replace(`/${latestVersion}`, "");
      latestDocVersions.push(latestDoc);
    }
  });

  const { homeTitle, homeDescription, linksConfig, footerLinksConfig } = siteMetadata;

  return (
    <PageContainer siteMetadata={siteMetadata}>
      <main id="content" className={styles.container}>
        <div>
          <header className={styles.header}>
            <div className={styles.headerText}>
              <div className={styles.headerTitle}>
                <h1>
                  {`${homeTitle} `}
                  <span className={styles.headerTitleDocs}>Docs</span>
                </h1>
              </div>
              <p className={styles.headerSubtitle}>{homeDescription}</p>
            </div>
            <div className={styles.headerSearch}>
              <DocsSearch resultsAlignment="left" theme="dark" />
            </div>
          </header>
          <div className={styles.content}>
            {linksConfig.map((config) => (
              <Section title={config.title}>
                <nav className={styles.sectionLinks}>
                  {config.links.map((link, index) => {
                    let linkPath = link.path;
                    const isExternal = linkPath.includes("http://") || linkPath.includes("https://");

                    if (!isExternal) {
                      linkPath = latestDocVersions.find((doc) => doc.configPath === linkPath)?.path ?? linkPath;
                    }

                    return link.image ? (
                      <ImageCard
                        key={`${link.title}-${link.path}-${index}`}
                        id={`${link.title}-${link.path}-${index}`}
                        isExternal={isExternal}
                        image={link.image}
                        title={link.title}
                        description={link.description}
                        path={linkPath}
                      />
                    ) : (
                      <SimpleCard
                        key={`${link.title}-${link.path}-${index}`}
                        id={`${link.title}-${link.path}-${index}`}
                        isExternal={isExternal}
                        title={link.title}
                        description={link.description}
                        path={linkPath}
                      />
                    );
                  })}
                </nav>
              </Section>
            ))}
          </div>
        </div>
        <Footer footerLinksConfig={footerLinksConfig} />
      </main>
    </PageContainer>
  );
}

function Section({ children, title }) {
  return (
    <section className={styles.section}>
      <h1 className={styles.sectionTitle}>{title}</h1>
      {children}
    </section>
  );
}

function SimpleCard({ id, isExternal, path, description, title }) {
  const hasDescription = Boolean(description);

  let titleHeight = 0;
  const titleLineHeight = 25;

  if (typeof window !== "undefined" && Boolean(window.document)) {
    titleHeight = document?.getElementById(id)?.offsetHeight;
  }

  const titleLineNumber = Math.round(titleHeight / titleLineHeight);

  const Content = () => (
    <>
      <h2 id={id} className={cx(styles.simpleCardTitle, { [styles.simpleCardTitleWithDescription]: hasDescription })}>
        {title}
      </h2>
      {hasDescription && (
        <p className={styles.simpleCardDescription} style={{ "-webkit-line-clamp": `${5 - titleLineNumber}` }}>
          {description}
        </p>
      )}
    </>
  );

  return isExternal ? (
    <a className={cx(styles.card, styles.simpleCard)} href={path}>
      <Content />
      <Launch24 className={styles.cardLaunchIcon} />
    </a>
  ) : (
    <Link className={cx(styles.card, styles.simpleCard)} to={path}>
      <Content />
      <ArrowRight24 className={styles.cardArrowIcon} />
    </Link>
  );
}

function ImageCard({ id, isExternal, image, path, description, title }) {
  const img = contentLabelsToImageMap[image] ?? contentLabelsToImageMap[ContentLabels.ProcessDeliveryAccelerator];

  let titleHeight = 0;
  const titleLineHeight = 25;

  if (typeof window !== "undefined" && Boolean(window.document)) {
    titleHeight = document?.getElementById(id)?.offsetHeight;
  }

  const titleLineNumber = Math.round(titleHeight / titleLineHeight);

  const Content = () => (
    <>
      <div className={styles.imageCardImage} style={{ backgroundImage: `url("${img}")` }} />
      <div className={styles.imageCardInfo}>
        <h3 id={id} className={styles.imageCardTitle}>
          {title}
        </h3>
        <p className={styles.imageCardDescription} style={{ "-webkit-line-clamp": `${4 - titleLineNumber}` }}>
          {description}
        </p>
      </div>
    </>
  );

  return isExternal ? (
    <a className={cx(styles.card, styles.imageCard)} href={path}>
      <Content />
      <Launch24 className={styles.cardLaunchIcon} />
    </a>
  ) : (
    <Link className={cx(styles.card, styles.imageCard)} to={path}>
      <Content />
      <ArrowRight24 className={styles.cardArrowIcon} />
    </Link>
  );
}

export default Home;

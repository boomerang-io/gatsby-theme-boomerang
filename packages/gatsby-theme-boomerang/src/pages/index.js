/* eslint-disable import/no-unresolved */
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import DocsSearch from "@gatsby-theme-boomerang/components/DocsSearch";
import Footer from "@gatsby-theme-boomerang/components/Footer";
import Link from "@gatsby-theme-boomerang/components/Link";
import cx from "classnames";
import isAbsoluteUrl from "is-absolute-url";
import semver from "semver";
import { ContentLabels, contentLabelsToImageMap } from "@gatsby-theme-boomerang/constants";
import { ArrowRight, Launch } from "@carbon/react/icons";
import * as styles from "./styles/Home.module.scss";

const pageQuery = graphql`
  query {
    site {
      pathPrefix
      siteMetadata {
        docsContext
        homeDescription
        homeTitle
        footerLinksConfig {
          link
          title
          type
        }
        linksConfig {
          title
          links {
            title
            description
            path
            image
            imageHref
          }
        }
        socialLinks {
          github
          twitter
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          fields {
            category
            slug
            solution
            title
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

  const { docsContext, homeTitle, homeDescription, linksConfig, footerLinksConfig } = siteMetadata;

  /**
   * Search for all versions of each doc so we can insert the latest one in the links config paths
   */
  const checkedDocIds = [];
  const allDocsPaths = [];
  docNodes.forEach(({ node }) => {
    const docId = `${node.fields.category}-${node.fields.solution}-${node.fields.title}`;

    if (!checkedDocIds.includes(docId)) {
      checkedDocIds.push(docId);

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
      const docConfigPath = pathToLatestDoc.replace(`/${latestVersion}`, "");
      allDocsPaths.push({ configPath: docConfigPath, path: pathToLatestDoc });
    }
  });

  const returnDocPathWithVersion = ({ configPath }) =>
    allDocsPaths.find((doc) => doc.configPath === configPath)?.path ?? configPath;

  return (
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
              <Section title={config.title} key={config.title}>
                <nav className={styles.sectionLinks}>
                  {config.links.map((link, index) => {
                    const isExternal = isAbsoluteUrl(link.path);
                    let linkPath = link.path;

                    if (!isExternal) linkPath = returnDocPathWithVersion({ configPath: link.path });

                    return (link.image || link.imageHref) ? (
                      <ImageCard
                        key={`${link.title}-${link.path}-${index}`}
                        id={`${link.title}-${link.path}-${index}`}
                        isExternal={isExternal}
                        imageHref={link.imageHref}
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

  const Content = () => (
    <>
      <h2 id={id} className={cx(styles.simpleCardTitle, { [styles.simpleCardTitleWithDescription]: hasDescription })}>
        {title}
      </h2>
      {hasDescription && <p className={styles.simpleCardDescription}>{description}</p>}
    </>
  );

  return (
    <Link className={cx(styles.card, styles.simpleCard)} to={path}>
      <Content />
      {isExternal ? <Launch size={24} className={styles.cardLaunchIcon} /> : <ArrowRight size={24} className={styles.cardArrowIcon} />}
    </Link>
  );
}

function ImageCard({ id, imageHref, image, isExternal, path, description, title }) {
  let img = imageHref;
  if (image) {
    const localImageAsset =
      contentLabelsToImageMap[image] ?? contentLabelsToImageMap[ContentLabels.ProcessDeliveryAccelerator];
    if (localImageAsset) {
      img = localImageAsset;
    }
  }

  const Content = () => (
    <>
      <div className={styles.imageCardImage} style={{ backgroundImage: `url("${img}")` }} />
      <div className={styles.imageCardInfo}>
        <h3 id={id} className={styles.imageCardTitle}>
          {title}
        </h3>
        <p title={description} className={styles.imageCardDescription}>
          {description}
        </p>
      </div>
    </>
  );

  return (
    <Link className={cx(styles.card, styles.imageCard)} to={path}>
      <Content />
      {isExternal ? <Launch className={styles.cardLaunchIcon} /> : <ArrowRight className={styles.cardArrowIcon} />}
    </Link>
  );
}

export default Home;

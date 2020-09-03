import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import Card from "@gatsby-theme-boomerang/components/Card";
import DocsSearch from "@gatsby-theme-boomerang/components/DocsSearch";
import styles from "./styles/Home.module.scss";

const pageQuery = graphql`
  query {
    site {
      pathPrefix
      siteMetadata {
        docsLocation
        siteUrl
        title
        headerTitle
        description
        solutions {
          description
          title
          solution
          categoryOrder
          path
        }
        docsQuickLinks {
          text
          path
        }
      }
    }
  }
`;

// Wrap in a static query so it can be imported in Gatsby and rendered as page on a different path
// Allows shadowing of the index to be something else if desired

function HomeContainer() {
  return <StaticQuery query={pageQuery} render={(data) => <Home data={data} />} />;
}

function Home({ data }) {
  const { siteMetadata } = data.site;
  return (
    <main className={styles.container} id="content">
      <header className={styles.header}>
        <div className={styles.introContainer}>
          <h1 className={styles.introTitle}>{siteMetadata.headerTitle}</h1>
          <p className={styles.introSubtitle}>{siteMetadata.description}</p>
          <DocsSearch resultsAlignment="left" />
        </div>
        <nav className={styles.quickLinksNav}>
          {siteMetadata.docsQuickLinks.map((navLink) => (
            <QuickLink key={navLink.text} title={navLink.text} href={navLink.path} />
          ))}
        </nav>
      </header>
      <article className={styles.article}>
        {siteMetadata.solutions.map((solution) => (
          <Link key={`${solution.title}-${solution.solution}`} to={solution.path}>
            <Card title={solution.title} text={solution.description} />
          </Link>
        ))}
      </article>
    </main>
  );
}

function QuickLink({ href, title }) {
  return (
    <Link className={styles.quickLink} to={href}>
      <div className={styles.quickLinkTitle}>
        <span>{title}</span>
      </div>
      <div className={styles.quickLinkIconContainer}>
        <QuickLinkIcon />
      </div>
    </Link>
  );
}

function QuickLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" role="presentation" className={styles.quickLinkIcon}>
      id="icon" viewBox="0 0 16 16" version="1.1">
      <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="icon-color" fill="black">
          <polygon id="path-1" points="9 3 8.295 3.705 12.085 7.5 1.5 7.5 1.5 8.5 12.085 8.5 8.295 12.295 9 13 14 8" />
        </g>
      </g>
    </svg>
  );
}

export default HomeContainer;

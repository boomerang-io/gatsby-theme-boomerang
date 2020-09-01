import React from "react";
import { Link } from "gatsby";
import Card from "Components/Card";
import DocsSearch from "Components/DocsSearch";
import siteConfig from "Root/siteConfig.js";
import contentConfig from "Root/contentConfig.js";
import styles from "./Home.module.scss";

function Home() {
  const { solutions, homeNavigationLinks } = contentConfig;
  const { siteMetadata } = siteConfig;
  return (
    <main className={styles.container} id="content">
      <header className={styles.header}>
        <div className={styles.introContainer}>
          <h1 className={styles.introTitle}>{siteMetadata.title}</h1>
          <p className={styles.introSubtitle}>{siteMetadata.description}</p>
          <DocsSearch resultsAlignment="left" />
        </div>
        <nav className={styles.quickLinksNav}>
          {homeNavigationLinks.map((navLink) => (
            <QuickLink key={navLink.text} title={navLink.text} href={navLink.path} />
          ))}
        </nav>
      </header>
      <article className={styles.article}>
        {solutions.map((solution) => (
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

export default Home;

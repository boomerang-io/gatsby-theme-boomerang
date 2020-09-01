import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Link from "Components/Link";
import DocsSearch from "Components/DocsSearch";
import styles from "./RightSideNav.module.scss";

const notAllowedCharsRegex = /[^a-zA-Z\d\s\-_.~]/g;
/**
 * Take a string and turn into a kebab-cased URL queryString safe value
 * Simple implementation in JS so same implementation can be done in the Java services
 * @param {string} value
 * @returns {any} string or the non-string value arg
 */
function kebabCaseQueryString(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value
    .trim() // remove whitespace at start and end
    .replace(notAllowedCharsRegex, "") // remove not allowed characters
    .replace(/\s+/g, "-") // replace series of spaces w/ a single hyphen
    .toLowerCase(); // lowercase it
}

const RightSideNav = ({ location }) => {
  const [activeSection, setActiveSection] = React.useState(location.hash);
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              pathPrefix
            }
          }
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                headings {
                  value
                  depth
                }
              }
            }
          }
        }
      `}
      render={({ site, allMarkdownRemark }) => {
        let finalNavItems;
        if (allMarkdownRemark.edges && allMarkdownRemark.edges.length > 0) {
          allMarkdownRemark.edges.forEach((item, index) => {
            let innerItems;
            if (item) {
              if (
                (location.pathname.includes(item.node.fields.slug) ||
                  location.pathname.includes(site.siteMetadata.pathPrefix + item.node.fields.slug)) &&
                item.node.headings
              ) {
                innerItems = item.node.headings.map((heading, index) => {
                  const sectionAnchor = `#${kebabCaseQueryString(heading.value)}`;
                  return (
                    <ListItem
                      className={styles.listItem}
                      isActive={activeSection === sectionAnchor}
                      key={`${heading.value}-${index}`}
                      level={heading.depth}
                      setActive={() => setActiveSection(sectionAnchor)}
                      to={sectionAnchor}
                    >
                      {heading.value}
                    </ListItem>
                  );
                });
              }
            }
            if (innerItems) {
              finalNavItems = innerItems;
            }
          });
        }

        return (
          <aside className={styles.aside}>
            <DocsSearch resultsAlignment="right" />
            <ul className={styles.list}>{finalNavItems}</ul>
          </aside>
        );
      }}
    />
  );
};

const ListItem = ({ className, children, isActive, level, setActive, ...props }) => {
  return (
    <li className={className}>
      <Link
        className={styles.link}
        onClick={setActive}
        style={{ paddingLeft: `${level * 1.2}rem`, fontWeight: isActive ? 600 : 400 }}
        {...props}
      >
        {children}
      </Link>
    </li>
  );
};

export default RightSideNav;

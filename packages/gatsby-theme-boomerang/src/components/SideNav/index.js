import React from "react";
import { navigate } from "gatsby";
import { AppContext } from "@gatsby-theme-boomerang/state";
import Link from "@gatsby-theme-boomerang/components/Link";
import { Dropdown, Layer } from "@carbon/react";
import cx from "classnames";
import semver from "semver";
import { useWindowSize } from "@gatsby-theme-boomerang/hooks";
import { unKebabCase } from "@gatsby-theme-boomerang/utils";
import { ArrowLeft } from "@carbon/react/icons";
import * as styles from "./SideNav.module.scss";

function SideNav({ location, pageContext, docNodes, isOpen, productTitle, siteMetadata }) {
  const { solution, version, allDocVersions } = pageContext;
  const { isSideNavMounted, setIsSideNavMounted } = React.useContext(AppContext);

  const windowSize = useWindowSize();

  /**
   * Tell the parent that it has mounted at least once
   * this component re-mounts each time the page changes but from a UX perspective it doesn't appear that way
   * Once we know it has mounted we can look at the scroll position and save it
   * */
  React.useEffect(() => {
    if (typeof window !== "undefined" && !isSideNavMounted) {
      setIsSideNavMounted(true);
    }
  }, [isSideNavMounted, setIsSideNavMounted]);

  const categories = Array.from(new Set(docNodes.map((item) => item.fields.category)));

  const categoriesWithLinks = categories.reduce((acc, category) => {
    acc[category] = docNodes.filter((item) => item.fields.category === category);
    return acc;
  }, {});

  return (
    <div id="sidenav" className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerNav}>
          <Link className={styles.backLink} to={siteMetadata.docsContext || "/"}>
            <ArrowLeft />
            Home
          </Link>
          <div className={styles.versionDropdown}>
            <Layer>
            <Dropdown
              id="version-dropdown"
              initialSelectedItem={allDocVersions.find((item) => item.version === version)}
              items={allDocVersions.sort((a, b) => {
                return semver.gt(a.version, b.version) ? -1 : 1
              })}
              itemToString={(item) => (item ? item.version : "")}
              label="versions"
              onChange={({ selectedItem }) => navigate(siteMetadata.docsContext + selectedItem.slug)}
            />
            </Layer>
          </div>
        </div>
        <h1 className={styles.productTitle}>{productTitle || unKebabCase(solution)}</h1>
      </header>
      <nav>
        {Object.entries(categoriesWithLinks).map(([category, nodes]) => (
          <section key={unKebabCase(category)}>
            <h2 className={styles.categoryTitle}>{unKebabCase(category)}</h2>
            <ul>
              {nodes.map((node) => (
                <ListItem
                  isActive={Boolean(
                    location.pathname.endsWith(node.fields.slug) || location.pathname.endsWith(`${node.fields.slug}/`)
                  )}
                  key={node.fields.slug}
                  tabIndex={!isOpen && windowSize.width < 768 ? -1 : 0}
                  to={siteMetadata.docsContext + node.fields.slug}
                >
                  {node.fields.title}
                </ListItem>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </div>
  );
}

function ListItem({ isActive, children, ...props }) {
  return (
    <li id={isActive ? "active-sidenav-page-link" : undefined}>
      <Link className={cx(styles.pageLink, { [styles.isActiveLink]: isActive })} {...props}>
        <span className={styles.pageLinkText}>{children}</span>
      </Link>
    </li>
  );
}

export default SideNav;

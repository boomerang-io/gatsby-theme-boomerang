import React from "react";
import Link from "Components/Link";
import DocsSearch from "Components/DocsSearch";
import { kebabCaseUrlComponent } from "Utils";
import styles from "./RightSideNav.module.scss";

export default function RightSideNav({ docNodes, location, siteMetadata }) {
  const [activeSection, setActiveSection] = React.useState(location.hash);
  const activeDoc = docNodes.find((doc) => location.pathname.includes(doc.fields.slug));
  const outlineNav = activeDoc?.headings.map((heading, index) => {
    const sectionAnchor = `#${kebabCaseUrlComponent(heading.value)}`;
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

  return (
    <aside className={styles.aside}>
      <DocsSearch resultsAlignment="right" />
      <ul className={styles.list}>{outlineNav}</ul>
    </aside>
  );
}

function ListItem({ className, children, isActive, level, setActive, ...props }) {
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
}

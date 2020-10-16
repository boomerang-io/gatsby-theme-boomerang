import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import kebab from "lodash.kebabcase";
import { unKebabCase } from "@gatsby-theme-boomerang/utils";
import styles from "./SearchSection.module.scss";

function SearchSection({ downshiftProps, docsContext, onClick, results = [] }) {
  const { getMenuProps, getItemProps } = downshiftProps;
  const uniqueDocList = [];
  const uniqueDocVersionlessSlugList = [];
  if (results.length > 0) {
    results.forEach((doc) => {
      const docVersionlessSlug = `${doc.solution}/${doc.category}/${doc.title}`;
      if (!uniqueDocVersionlessSlugList.includes(docVersionlessSlug)) {
        uniqueDocList.push(doc);
        uniqueDocVersionlessSlugList.push(docVersionlessSlug);
      }
    });
  }
  return uniqueDocList.length > 0 ? (
    <div className={styles.list}>
      <ul {...getMenuProps()}>
        {uniqueDocList.slice(0, 10).map(
          (doc, index) =>
            doc.solution &&
            doc.title && (
              <li key={doc.id} {...getItemProps({ item: doc, index })}>
                <Link
                  className={styles.link}
                  to={`${docsContext}/${doc.solution}/${doc.category}/${kebab(doc.title)}`}
                  onClick={onClick}
                >
                  <p className={styles.linkLabel}>{`${unKebabCase(doc.solution)} / ${unKebabCase(doc.category)}`}</p>
                  <p className={styles.linkValue}>{doc.title}</p>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  ) : null;
}

SearchSection.propTypes = {
  onClick: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default SearchSection;

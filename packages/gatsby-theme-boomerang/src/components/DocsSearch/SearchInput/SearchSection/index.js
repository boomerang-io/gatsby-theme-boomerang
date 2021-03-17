import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Link } from "gatsby";
import { unKebabCase } from "@gatsby-theme-boomerang/utils";
import styles from "./SearchSection.module.scss";

function SearchSection({ downshiftProps, docsContext, onClick, results = [], contentConfig = [], theme }) {
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

  const findSolutionTitle = (docSolution) =>
    console.log(contentConfig) ||
    contentConfig.reduce((prev, next) => prev.concat(next.links), []).find((config) => config.solution === docSolution)
      ?.title ||
    unKebabCase(docSolution);

  return uniqueDocList.length > 0 ? (
    <div className={cx(styles.list, styles[theme])}>
      <ul {...getMenuProps()}>
        {uniqueDocList.slice(0, 10).map(
          (doc, index) =>
            doc.solution &&
            doc.title && (
              <li key={doc.id} {...getItemProps({ item: doc, index })}>
                <Link className={styles.link} to={`${docsContext}${doc.slug}`} onClick={onClick}>
                  <p className={styles.linkLabel}>{`${findSolutionTitle(doc.solution)} / ${unKebabCase(
                    doc.category
                  )}`}</p>
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

import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
// eslint-disable-next-line import/no-unresolved
import Link from "@gatsby-theme-boomerang/components/Link";
// eslint-disable-next-line import/no-unresolved
import { unKebabCase } from "@gatsby-theme-boomerang/utils";
import * as styles from "./SearchSection.module.scss";

function SearchSection({ downshiftProps, docsContext, onClick, results = [], solutionsConfig = [], theme }) {
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
    solutionsConfig.find((config) => config.solution === docSolution)?.title || unKebabCase(docSolution);

  return uniqueDocList.length > 0 ? (
    <div className={cx(styles.list, styles[theme])}>
      <ul {...getMenuProps()}>
        {uniqueDocList.slice(0, 10).map(
          (doc, index) =>
            doc.solution &&
            doc.title && (
              <Link
                {...getItemProps({ item: doc, index })}
                className={styles.link}
                to={`${docsContext}${doc.slug}`}
                onClick={onClick}
                key={doc.id}
              >
                <p className={styles.linkLabel}>{`${findSolutionTitle(doc.solution)} / ${unKebabCase(
                  doc.category
                )}`}</p>
                <p className={styles.linkValue}>{doc.title}</p>
              </Link>
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

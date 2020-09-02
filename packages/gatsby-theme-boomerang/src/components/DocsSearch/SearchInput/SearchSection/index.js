import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { unKebabCase } from "Utils";
import styles from "./SearchSection.module.scss";

function SearchSection({ onClick, results, title }) {
  return results.length > 0 ? (
    <div className={styles.list}>
      <h2 className={styles.title}>{title}</h2>
      <ul>
        {results.slice(0, 10).map(
          (doc) =>
            doc.solution &&
            doc.title && (
              <li key={doc.id}>
                <Link className={styles.link} to={doc.slug} onClick={onClick}>
                  {`${unKebabCase(doc.solution)} -> ${doc.version}-> ${unKebabCase(doc.category)} -> ${doc.title}`}
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

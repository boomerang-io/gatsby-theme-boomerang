import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import SearchInput from "./SearchInput";

const DocsSearch = ({ resultsAlignment }) => (
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        site {
          siteMetadata {
            docsContext
            solutions {
              title
              solution
            }
          }
        }
        siteSearchIndex {
          index
        }
      }
    `}
    render={(data) => (
      <SearchInput
        docsContext={data.site.siteMetadata.docsContext}
        searchIndex={data.siteSearchIndex.index}
        resultsAlignment={resultsAlignment}
        solutionsConfig={data.site.siteMetadata.solutions}
      />
    )}
  />
);

DocsSearch.propTypes = {
  resultsAlignment: PropTypes.oneOf(["left", "right"]),
};

export default DocsSearch;

import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import SearchInput from "./SearchInput";

const DocsSearch = ({ resultsAlignment, theme = "light" }) => (
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        site {
          siteMetadata {
            docsContext
            contentConfig {
              title
              links {
                title
                solution
              }
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
        contentConfig={data.site.siteMetadata.contentConfig}
        theme={theme}
      />
    )}
  />
);

DocsSearch.propTypes = {
  resultsAlignment: PropTypes.oneOf(["left", "right"]),
  theme: PropTypes.oneOf(["light", "dark"]),
};

export default DocsSearch;

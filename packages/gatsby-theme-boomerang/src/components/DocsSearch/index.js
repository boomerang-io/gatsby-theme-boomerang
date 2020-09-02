import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import SearchInput from "./SearchInput";

const DocsSearch = ({ resultsAlignment }) => (
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={(data) => <SearchInput searchIndex={data.siteSearchIndex.index} resultsAlignment={resultsAlignment} />}
  />
);

DocsSearch.propTypes = {
  resultsAlignment: PropTypes.oneOf(["left", "right"]),
};

export default DocsSearch;

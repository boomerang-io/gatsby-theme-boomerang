import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { navigate } from "gatsby";
import { Index } from "elasticlunr";
import { Search } from "carbon-components-react";
import Downshift from "downshift";
import kebab from "lodash.kebabcase";
import SearchSection from "./SearchSection";
import styles from "./SearchInput.module.scss";

// Search component

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      resultsTitle: [],
      resultsContent: [],
    };
    this.resetState = this.resetState.bind(this);
    this.ref = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.ref && !this.ref.current.contains(event.target)) {
      this.resetState();
    }
  };

  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex);

  handleOnSearch = (evt) => {
    const query = evt.target.value;
    this.index = this.getOrCreateIndex();
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      resultsTitle: this.index
        .search(query, {
          fields: {
            title: {},
          },
          expand: true,
        })
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
      resultsContent: this.index
        .search(query, {
          fields: {
            content: {},
          },
        })
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    });
  };

  resetState() {
    this.setState(() => ({
      query: "",
      resultsTitle: [],
      resultsContent: [],
    }));
  }

  render() {
    const { theme } = this.props;

    return (
      <div className={cx(styles.container, styles[theme])} ref={this.ref}>
        <Downshift
          itemToString={(doc) => doc && `${doc.solution}/${doc.category}/${kebab(doc.title)}`}
          onChange={(doc) =>
            doc && navigate(`${this.props.docsContext}/${doc.solution}/${kebab(doc.category)}/${kebab(doc.title)}`)
          }
        >
          {(downshiftProps) => {
            const { getInputProps, getRootProps } = downshiftProps;
            return (
              <div className={styles.searchContainer}>
                <div {...getRootProps({ style: { width: "100%" } }, { suppressRefError: true })}>
                  <Search
                    {...getInputProps({
                      autoComplete: "off",
                      labelText: "Search all docs",
                      onChange: this.handleOnSearch,
                      onCancel: this.resetState,
                      placeHolderText: "Search all docs",
                      value: this.state.query,
                    })}
                  />
                </div>
                <div
                  className={`${styles.resultsContainer} ${styles[this.props.resultsAlignment]} ${
                    styles[this.state.resultsTitle.length || this.state.resultsContent.length ? "open" : "closed"]
                  }`}
                >
                  <SearchSection
                    downshiftProps={downshiftProps}
                    docsContext={this.props.docsContext}
                    onClick={this.resetState}
                    results={[...this.state.resultsTitle, ...this.state.resultsContent]}
                    contentConfig={this.props.contentConfig}
                    title="Titles"
                    theme={theme}
                  />
                </div>
              </div>
            );
          }}
        </Downshift>
      </div>
    );
  }
}

SearchInput.propTypes = {
  resultsAlignment: PropTypes.oneOf(["left", "right"]),
  searchIndex: PropTypes.object.isRequired,
};

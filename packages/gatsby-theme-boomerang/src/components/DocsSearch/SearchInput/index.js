import React, { Component } from "react";
import PropTypes from "prop-types";
import { Index } from "elasticlunr";
import { Search } from "carbon-components-react";
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
    return (
      <div className={styles.container} ref={this.ref}>
        <Search
          autoComplete="off"
          labelText="Search all docs"
          onChange={this.handleOnSearch}
          onCancel={this.resetState}
          placeHolderText="Search all docs"
          value={this.state.query}
        />
        <div className={`${styles.resultsContainer} ${styles[this.props.resultsAlignment]}`}>
          <SearchSection
            docsContext={this.props.docsContext}
            onClick={this.resetState}
            results={this.state.resultsTitle}
            title="Titles"
          />
          <SearchSection
            docsContext={this.props.docsContext}
            onClick={this.resetState}
            results={this.state.resultsContent}
            title="Content"
          />
        </div>
      </div>
    );
  }
}

SearchInput.propTypes = {
  resultsAlignment: PropTypes.oneOf(["left", "right"]),
  searchIndex: PropTypes.object.isRequired,
};

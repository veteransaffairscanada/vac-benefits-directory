import React, { Component } from "react";
import PropTypes from "prop-types";
import lunr from "lunr";

import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";

import AutoSuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { connect } from "react-redux";
import { globalTheme } from "../theme";
import { css } from "react-emotion";

const container = css`
  flex-grow: 1;
  position: relative;
`;
const inputIcon = css`
  padding-top: 3px;
  padding-right: 5px;
`;
const suggestionsContainerOpen = css`
  position: absolute;
  z-index: 1;
  margin-top: ${globalTheme.unit};
  left: 0;
  right: 0;
  overflow: auto;
  max-height: 300px;
`;
const searchWrap = css`
  display: inline-flex;
  width: 100%;
  border-style: solid;
  border-width: 1px;
  border-radius: 0px;
  padding-left: 5px !important;
`;
const searchBox = css`
  display: inline-flex;
  padding: 10px;
  font-size: 15px;
  flex: 1;
  margin-right: 10px;
  border-width: 0px;
  width: 100%;
  font-family: Merriweather;
`;
const searchInputField = css`
  display: inline-flex;
  font-size: 15px;
  flex: 1;
  border-width: 0px;
  width: 100%;
  font-family: Merriweather;
`;
const suggestion = css`
  display: block;
`;
const suggestionsList = css`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;
const searchButton = css`
  padding: 15px !important;
  padding-left: 50px !important;
  padding-right: 50px !important;
  text-transform: none !important;
  border-radius: 0px !important;
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    display: none !important;
  }
`;

export class Search extends Component {
  constructor(props) {
    super(props);
    this.enIdx = lunr.Index.load(JSON.parse(this.props.enIdx));
    this.frIdx = lunr.Index.load(JSON.parse(this.props.frIdx));
  }

  state = {
    value: "",
    suggestions: []
  };

  doSearch = () => {
    let href =
      "/benefits-directory?lng=" +
      this.props.t("current-language-code") +
      "&searchString=" +
      this.state.value;
    window.location.href = href;
  };

  getSuggestions = value => {
    let results = [];
    if (value.trim() === "") {
      return results;
    }
    value = value.toLowerCase();
    if (this.props.t("current-language-code") === "en") {
      results = this.enIdx.query(q => {
        value.split(" ").forEach(term => {
          q.term(term, { usePipeline: true, boost: 100 });
          q.term(term, {
            usePipeline: false,
            boost: 10,
            wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING
          });
          q.term(term, { usePipeline: false, editDistance: 1 });
        });
      });
    } else {
      results = this.frIdx.query(q => {
        value.split(" ").forEach(term => {
          q.term(term, { usePipeline: true, boost: 100 });
          q.term(term, {
            usePipeline: false,
            boost: 10,
            wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING
          });
          q.term(term, { usePipeline: false, editDistance: 1 });
        });
      });
    }
    let resultIds = results.map(r => r.ref);
    let matchingBenefits = this.props.benefits.filter(b =>
      resultIds.includes(b.id)
    );
    return this.props.t("current-language-code") === "en"
      ? matchingBenefits.map(b => b.vacNameEn)
      : matchingBenefits.map(b => b.vacNameFr);
  };

  getSuggestionValue = suggestion => suggestion;

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onKeyDown = () => {
    this.setState({ value: document.getElementById("inputField").value });
  };

  onKeyUp = e => {
    this.setState({ value: document.getElementById("inputField").value });
    if (e.key === "Enter") {
      this.doSearch();
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderInput = inputProps => {
    const { ...other } = inputProps;
    return (
      <div id={this.props.id} className={searchWrap}>
        <div className={searchBox}>
          <SearchIcon className={inputIcon} />
          <input
            id="inputField"
            aria-label="search"
            type="text"
            placeholder={this.props.t("search")}
            className={searchInputField}
            onKeyDown={this.onKeyDown}
            onKeyUp={this.onKeyUp}
            {...other}
          />
        </div>
        <div>
          <Button
            id="searchButtonLink"
            className={searchButton}
            variant="raised"
            color="primary"
            href={
              "benefits-directory?lng=" +
              this.props.t("current-language-code") +
              "&searchString=" +
              this.state.value
            }
          >
            {this.props.t("search-button")}
          </Button>
        </div>
      </div>
    );
  };

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </MenuItem>
    );
  };

  renderSuggestionsContainer = options => {
    let { containerProps, children } = options;
    delete containerProps.role; // This fails the aXe test. The Child list is correct though
    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      onChange: this.onChange
    };

    return (
      <AutoSuggest
        theme={{
          container: container,
          suggestionsContainerOpen: suggestionsContainerOpen,
          suggestionsList: suggestionsList,
          suggestion: suggestion
        }}
        renderInputComponent={this.renderInput}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    benefits: reduxState.benefits,
    enIdx: reduxState.enIdx,
    frIdx: reduxState.frIdx
  };
};

Search.propTypes = {
  benefits: PropTypes.array.isRequired,
  enIdx: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
  id: PropTypes.string,
  frIdx: PropTypes.string.isRequired,
  store: PropTypes.object,
  t: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Search);

import React, { Component } from "react";
import PropTypes from "prop-types";
import lunr from "lunr";

import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";

import AutoSuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { connect } from "react-redux";
import { globalTheme } from "../theme";
import { css } from "react-emotion";
import SearchBox from "./search_box";

const container = css`
  flex-grow: 1;
  position: relative;
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
const suggestion = css`
  display: block;
`;
const suggestionsList = css`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;
const spanCSS = css`
  font-weight: 500;
`;
const strongCSS = css`
  font-weight: 300;
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
      <SearchBox
        wrapperId={this.props.id}
        inputId="inputField"
        placeholder={this.props.t("search")}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        onButtonClick={this.doSearch}
        otherProps={other}
      />
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
              <span key={String(index)} className={spanCSS}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} className={strongCSS}>
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

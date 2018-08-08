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
import { withStyles } from "@material-ui/core/styles";

import Router from "next/router";

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: "relative"
  },
  inputIcon: {
    paddingTop: "3px",
    paddingRight: "5px"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    overflow: "auto",
    maxHeight: "300px"
  },
  searchWrap: {
    display: "inline-flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "0px",
    paddingLeft: "5px"
  },
  searchBox: {
    display: "inline-flex",
    padding: "10px",
    fontSize: "15px",
    flex: 1,
    marginRight: "10px",
    borderWidth: "0px",
    width: "100%",
    fontFamily: "Merriweather"
  },
  searchInputField: {
    display: "inline-flex",
    fontSize: "15px",
    flex: 1,
    borderWidth: "0px",
    width: "100%",
    fontFamily: "Merriweather"
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  searchButton: {
    padding: "15px",
    paddingLeft: "50px",
    paddingRight: "50px",
    textTransform: "none",
    borderRadius: "0px",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  }
});

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
    Router.push(href);
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
    const { classes, ...other } = inputProps;
    return (
      <div id={this.props.id} className={this.props.classes.searchWrap}>
        <div className={classes.searchBox}>
          <SearchIcon className={this.props.classes.inputIcon} />
          <input
            id="inputField"
            aria-label="search"
            type="text"
            placeholder={this.props.t("search")}
            className={classes.searchInputField}
            onKeyDown={this.onKeyDown}
            onKeyUp={this.onKeyUp}
            {...other}
          />
        </div>
        <div>
          <Button
            id="searchButtonLink"
            className={classes.searchButton}
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
    const { classes } = this.props;
    const { value, suggestions } = this.state;
    const inputProps = {
      classes,
      value,
      onChange: this.onChange
    };

    return (
      <AutoSuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
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
  classes: PropTypes.object.isRequired,
  enIdx: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
  id: PropTypes.string,
  frIdx: PropTypes.string.isRequired,
  store: PropTypes.object,
  t: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Search));

import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";

import AutoSuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: "relative"
  },
  input: {
    marginTop: "5px"
  },
  inputIcon: {
    marginTop: "5px"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  searchWrap: {
    display: "inline-flex",
    width: "100%"
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  }
});

export class Search extends Component {
  state = {
    value: "",
    suggestions: []
  };

  getSuggestions = value => {
    const inputValue = value
      .trim()
      .toLowerCase()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const inputLength = inputValue.length;
    let titles;

    if (this.props.t("current-language-code") == "en") {
      titles = this.props.benefits.map(benefit => benefit["vacNameEn"]);
    } else {
      titles = this.props.benefits.map(benefit => benefit["vacNameFr"]);
    }

    const regex = new RegExp(inputValue, "i");

    return inputLength === 0 ? [] : titles.filter(title => regex.test(title));
  };

  getSuggestionValue = suggestion => suggestion;

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
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
    const { classes, ref, ...other } = inputProps;
    return (
      <div id={this.props.id} className={this.props.classes.searchWrap}>
        <div style={{ flex: 1, marginRight: "10px" }}>
          <TextField
            id={this.props.t("search")}
            className={this.props.classes.input}
            fullWidth
            label={this.props.t("search")}
            InputProps={{
              inputRef: ref,
              classes: {
                input: classes.input
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className={this.props.classes.inputIcon} />
                </InputAdornment>
              ),
              ...other
            }}
          />
        </div>
        <div>
          <Button
            id="searchButtonLink"
            style={{ padding: "20px" }}
            variant="raised"
            color="primary"
            href={
              "benefits-directory?lng=" +
              this.props.t("current-language-code") +
              "&searchString=" +
              this.state.value
            }
          >
            {this.props.t("search")}
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
    const { classes, t } = this.props;
    const { value, suggestions } = this.state;
    const inputProps = {
      classes,
      placeholder: t("search"),
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
    benefits: reduxState.benefits
  };
};

Search.propTypes = {
  benefits: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  id: PropTypes.string,
  store: PropTypes.object,
  t: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Search));

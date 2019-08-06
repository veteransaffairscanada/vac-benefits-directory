// from: https://raw.githubusercontent.com/UKHomeOffice/govuk-react/master/components/search-box/src/index.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import SearchIcon from "./icons/Search";
import Cancel from "./icons/Cancel";
import { globalTheme } from "../theme";
// import Router from "next/router";
// import { mutateUrl } from "../utils/common";

const SearchBoxWrapper = styled("div")({
  boxSizing: "border-box",
  display: "flex",
  width: "100%",
  background: globalTheme.colour.paleGreyTwo,
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: globalTheme.colour.boxBorderColour
});

const InputSearchBox = styled("input")({
  width: "100%",
  height: "44px",
  padding: "9px 19px 8px 19px",
  margin: 0,
  border: 0,
  boxSizing: "border-box",
  fontFamily: globalTheme.fontFamilySansSerif,
  color: globalTheme.colour.navy,
  fontWeight: "bold",
  textTransform: "none",
  fontSize: "18px",
  lineHeight: "1.5",
  background: globalTheme.colour.paleGreyTwo,
  borderRadius: 0,
  boxShadow: "inset 0 0 0 9999px #f4f7f9", // keeps chrome autofill from changing background colour
  WebkitAppearance: "none",
  ":focus": {
    marginRight: "3px",
    outline: `3px solid ` + globalTheme.colour.focusColour,
    outlineOffset: 0,
    " ~ button": {
      width: "46px"
    }
  }
});

const ClearButton = styled("button")({
  backgroundColor: globalTheme.colour.paleGreyTwo,
  cursor: "pointer",
  border: 0,
  display: "block",
  color: globalTheme.colour.navy,
  position: "absolute",
  left: "-50px",
  padding: "10px",
  width: "45px",
  height: "44px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "2px 50%",
  ":focus": {
    outlineOffset: 0,
    outline: `3px solid ` + globalTheme.colour.focusColour
  },
  ":hover": {
    color: globalTheme.colour.black
  }
});

const SearchButton = styled("button")({
  backgroundColor: globalTheme.colour.paleGreyTwo,
  cursor: "pointer",
  border: 0,
  display: "block",
  color: globalTheme.colour.navy,
  position: "relative",
  padding: "10px",
  width: "45px",
  height: "44px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "2px 50%",
  ":focus": {
    outlineOffset: 0,
    outline: `3px solid ` + globalTheme.colour.focusColour
  },
  ":hover": {
    backgroundColor: globalTheme.colour.black
  }
});

const DisabledSearchButton = styled("button")({
  backgroundColor: globalTheme.colour.paleGreyTwo,
  display: "block",
  color: globalTheme.colour.navy,
  padding: "10px",
  width: "45px",
  height: "44px",
  border: 0,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "2px 50%"
});

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  handleChange = event => {
    this.setState({ value: event.target.value }); // state of InputSearchBox
    // this.props.url.query.searchString = event.target.value.split(" ").join("-");
    // Router.replace(mutateUrl(this.props.url));
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  handleClear = () => {
    this.textInput.current.value = "";
    this.setState({ value: "" }); // state of InputSearchBox
    // this.props.url.query.searchString = "";
    // Router.replace(mutateUrl(this.props.url));
    if (this.props.onClear) {
      this.props.onClear();
    }
  };

  render() {
    const { ariaLabel, value, onButtonClick } = this.props;
    let valueUsed;
    try {
      valueUsed = this.textInput.current.value;
    } catch (e) {} // eslint-disable-line no-empty

    return (
      <SearchBoxWrapper id={this.props.wrapperId}>
        <InputSearchBox
          type="search"
          aria-label={ariaLabel}
          id={this.props.inputId}
          placeholder={this.props.placeholder}
          onKeyDown={this.props.onKeyDown}
          onKeyUp={this.props.onKeyUp}
          onInput={this.handleChange}
          onChange={this.handleChange}
          value={value}
          ref={this.textInput}
        />

        {(this.props.onClear && value) || valueUsed ? (
          <div style={{ position: "relative" }}>
            <ClearButton
              title={ariaLabel}
              id="clearButton"
              onClick={this.handleClear}
            >
              <Cancel />
            </ClearButton>
          </div>
        ) : null}

        {this.props.disableButton ? (
          <DisabledSearchButton title={ariaLabel} disabled>
            <SearchIcon />
          </DisabledSearchButton>
        ) : (
          <SearchButton
            title={ariaLabel}
            id={this.props.buttonId}
            onClick={onButtonClick}
          >
            <SearchIcon />
          </SearchButton>
        )}
      </SearchBoxWrapper>
    );
  }
}

SearchBox.defaultProps = {
  ariaLabel: "search",
  placeholder: undefined,
  onButtonClick: x => x
};

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  ariaLabel: PropTypes.string,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  wrapperId: PropTypes.string,
  buttonHref: PropTypes.string,
  inputId: PropTypes.string,
  buttonId: PropTypes.string,
  disableButton: PropTypes.bool,
  onButtonClick: PropTypes.func,
  url: PropTypes.object
};

export default SearchBox;

// from: https://raw.githubusercontent.com/UKHomeOffice/govuk-react/master/components/search-box/src/index.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { globalTheme } from "../theme";

const SearchBoxWrapper = styled("div")({
  boxSizing: "border-box",
  display: "flex",
  width: "100%",
  background: globalTheme.colour.white,
  boxShadow: globalTheme.boxShadowMui
});

const InputSearchBox = styled("input")({
  width: "100%",
  height: "44px",
  padding: "9px 19px 8px 19px",
  margin: 0,
  border: 0,
  boxSizing: "border-box",
  fontFamily: globalTheme.fontFamily,
  fontWeight: 400,
  textTransform: "none",
  fontSize: "18px",
  lineHeight: "1.5",
  background: globalTheme.colour.white,
  borderRadius: 0,
  WebkitAppearance: "none",
  ":focus": {
    marginRight: "3px",
    outline: `3px solid ` + globalTheme.colour.govukYellow,
    outlineOffset: 0,
    " ~ button": {
      width: "46px"
    }
  }
});

const ClearButton = styled("button")({
  backgroundColor: globalTheme.colour.white,
  cursor: "pointer",
  border: 0,
  display: "block",
  color: globalTheme.colour.cerulean,
  position: "absolute",
  left: "-50px",
  padding: "10px",
  width: "45px",
  height: "44px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "2px 50%",
  ":focus": {
    outlineOffset: 0
  },
  ":hover": {
    color: globalTheme.colour.black
  }
});

const SearchButton = styled("button")({
  backgroundColor: globalTheme.colour.cerulean,
  cursor: "pointer",
  border: 0,
  display: "block",
  color: globalTheme.colour.white,
  position: "relative",
  padding: "10px",
  width: "45px",
  height: "44px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "2px 50%",
  ":focus": {
    outlineOffset: 0
  },
  ":hover": {
    backgroundColor: globalTheme.colour.darkGreyBlue
  }
});

const DisabledSearchButton = styled("button")({
  backgroundColor: globalTheme.colour.white,
  display: "block",
  color: globalTheme.colour.cerulean,
  position: "relative",
  padding: "10px",
  width: "45px",
  height: "44px",
  border: 0,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "2px 50%"
});

class SearchBox extends Component {
  handleChange = event => {
    this.setState({ value: event.target.value }); // state of InputSearchBox
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  handleClear = () => {
    document.getElementById(this.props.inputId).value = "";
    this.setState({ value: "" }); // state of InputSearchBox
    if (this.props.onClear) {
      this.props.onClear();
    }
    if (this.props.otherProps) {
      this.props.otherProps.onChange({ target: { value: "" } });
    }
  };

  render() {
    const {
      placeholder,
      onKeyDown,
      onKeyUp,
      wrapperId,
      onButtonClick,
      onClear,
      inputId,
      buttonId,
      ariaLabel,
      disableButton,
      value,
      otherProps
    } = this.props;

    let valueUsed;
    try {
      valueUsed = document.getElementById(this.props.inputId).value;
    } catch (e) {} // eslint-disable-line no-empty

    return (
      <SearchBoxWrapper id={wrapperId}>
        <InputSearchBox
          type="search"
          aria-label={ariaLabel}
          id={inputId}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          // defaultValue={value !== undefined ? value : this.state.value}
          onInput={this.handleChange}
          onChange={this.handleChange}
          {...otherProps}
          value={otherProps ? otherProps.value : value}
        />

        {(onClear && value) || (otherProps && otherProps.value) || valueUsed ? (
          <div style={{ position: "relative" }}>
            <ClearButton
              title={ariaLabel}
              id="clearButton"
              onClick={this.handleClear}
            >
              <ClearIcon />
            </ClearButton>
          </div>
        ) : null}

        {disableButton ? (
          <DisabledSearchButton title={ariaLabel} tabIndex="-1">
            <SearchIcon />
          </DisabledSearchButton>
        ) : (
          <SearchButton title={ariaLabel} id={buttonId} onClick={onButtonClick}>
            <SearchIcon />
          </SearchButton>
        )}
      </SearchBoxWrapper>
    );
  }
}

SearchBox.defaultProps = {
  ariaLabel: "search",
  placeholder: undefined
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
  otherProps: PropTypes.object
};

export default SearchBox;

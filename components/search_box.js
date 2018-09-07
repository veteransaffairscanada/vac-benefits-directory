// https://govuk-static.herokuapp.com/component-guide/search

import React from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";

// import { Search } from '@govuk-react/icons';
import SearchIcon from "@material-ui/icons/Search";
import { globalTheme } from "../theme";

const SearchBoxWrapper = styled("div")({
  boxSizing: "border-box",
  display: "flex",
  width: "100%",
  background: globalTheme.colour.white
});

// css normalize is hiding the input:search clear SearchButton
const InputSearchBox = styled("input")({
  width: "100%",
  height: "40px",
  padding: "6px",
  margin: 0,
  border: `solid 1px ` + globalTheme.colour.warmGrey,
  borderRight: 0,
  boxSizing: "border-box",
  fontFamily: globalTheme.fontFamily,
  fontWeight: 400,
  textTransform: "none",
  fontSize: "16px",
  lineHeight: "1.75",
  background: globalTheme.colour.white,
  borderRadius: 0,
  WebkitAppearance: "none",
  ":focus": {
    marginRight: "3px",
    outline: `3px solid ` + globalTheme.colour.gdsYellow,
    outlineOffset: 0,
    " ~ button": {
      width: "46px"
    }
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
  height: "40px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "2px 50%",
  ":focus": {
    outline: `3px solid ` + globalTheme.colour.gdsYellow,
    outlineOffset: 0
  },
  ":hover": {
    backgroundColor: globalTheme.colour.darkGreyBlue
  }
});

const SearchBox = ({
  placeholder,
  onKeyDown,
  onKeyUp,
  wrapperId,
  onButtonClick,
  inputId,
  otherProps
}) => (
  <SearchBoxWrapper id={wrapperId}>
    <InputSearchBox
      type="search"
      aria-label="search"
      id={inputId}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      {...otherProps}
    />
    <SearchButton title="Search" onClick={onButtonClick}>
      <SearchIcon />
    </SearchButton>
  </SearchBoxWrapper>
);

SearchBox.defaultProps = {
  placeholder: undefined
};

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  wrapperId: PropTypes.string,
  buttonHref: PropTypes.string,
  inputId: PropTypes.string,
  otherProps: PropTypes.object
};

export default SearchBox;

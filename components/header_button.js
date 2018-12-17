/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { css, jsx } from "@emotion/core";
import ArrowBack from "./icons/ArrowBack";
import ArrowForward from "./icons/ArrowForward";

const style = css`
  display: inline-block;
  text-align: left;
  font-family: ${globalTheme.fontFamily};
  font-size: 21px;
  font-weight: bold;
  color: ${globalTheme.colour.cerulean};
  background-color: transparent;
  border: none;
  text-decoration: none !important;
  padding: 0px !important;
  :hover {
    text-decoration: underline !important;
    cursor: pointer;
  }
  svg {
    margin-top: -4px;
    vertical-align: middle;
    padding-right: 10px;
  }
  :focus {
    outline: 3px solid ${globalTheme.colour.focusColour};
  }
`;
const small = css`
  font-size: 18px;
`;

const grey = css`
  font-size: 18px;
  color: ${globalTheme.colour.brownishGrey};
  margin-left: 20px;
  text-decoration: underline !important;
  padding: 0.526315em 0.789473em !important;
`;

class HeaderButton extends Component {
  render() {
    const {
      id,
      arrow,
      css,
      children,
      size,
      altStyle,
      disabled,
      onClick,
      otherProps
    } = this.props;

    return (
      <button
        aria-label={this.props.ariaLabel}
        disabled={disabled}
        css={
          size === "small"
            ? [style, small, css]
            : altStyle === "grey"
            ? [style, grey, css]
            : [style, css]
        }
        id={"a-" + id}
        onClick={onClick}
        {...otherProps}
      >
        {arrow === "back" ? <ArrowBack /> : null}
        {children}
        {arrow === "forward" ? <ArrowForward /> : null}
      </button>
    );
  }
}

HeaderButton.propTypes = {
  id: PropTypes.string,
  size: PropTypes.string,
  ariaLabel: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  css: PropTypes.string,
  arrow: PropTypes.string,
  label: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default HeaderButton;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { cx, css } from "emotion";
const style = css`
  font-family: ${globalTheme.fontFamilySansSerif};
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  text-decoration: none;
  vertical-align: middle;
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  overflow: hidden;
  outline: none;
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: 3px solid ${globalTheme.colour.focusColour};
  }
`;

class FooterButton extends Component {
  render() {
    const { className, onClick, children, ...other } = this.props;
    return (
      <button
        className={className ? cx(style, className) : style}
        onClick={onClick}
        {...other}
      >
        {children}
      </button>
    );
  }
}
FooterButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.string,
  onClick: PropTypes.func
};
export default FooterButton;

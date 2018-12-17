/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { css, jsx } from "@emotion/core";
const style = css`
  font-family: ${globalTheme.fontFamily};
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-left: 10px;
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
    const { className, onClick, children, other } = this.props;
    return (
      <button
        css={className ? [style, className] : style}
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
  className: PropTypes.string
};
export default FooterButton;

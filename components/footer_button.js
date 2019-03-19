import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
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
    const { css, onClick, children, ...other } = this.props;
    return (
      <button css={css ? [style, css] : style} onClick={onClick} {...other}>
        {children}
      </button>
    );
  }
}
FooterButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  css: PropTypes.string,
  onClick: PropTypes.func
};
export default FooterButton;

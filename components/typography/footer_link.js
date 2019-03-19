import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const style = css`
  font-family: ${globalTheme.fontFamilySansSerif};
  font-size: 14px;
  font-weight: bold;
  color: ${globalTheme.colour.white};
  margin: 0px;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: 3px solid ${globalTheme.colour.focusColour};
  }
`;

class FooterLink extends Component {
  render() {
    const { css, children, ...other } = this.props;
    return (
      <a css={css ? [style, css] : style} {...other}>
        {children}
      </a>
    );
  }
}

FooterLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  css: PropTypes.string
};

export default FooterLink;

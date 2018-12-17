/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
import { css, jsx } from "@emotion/core";

const style = css`
  font-family: ${globalTheme.fontFamily};
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
    const { className, children, ...other } = this.props;
    return (
      <a css={className ? [style, className] : style} {...other}>
        {children}
      </a>
    );
  }
}

FooterLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.string
};

export default FooterLink;

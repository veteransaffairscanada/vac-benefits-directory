import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

class AnchorLink extends Component {
  style = css`
    font-family: ${globalTheme.fontFamilySansSerif};
    font-size: ${this.props.fontSize};
    line-height: 1.5;
    font-weight: ${this.props.fontWeight};
    color: ${globalTheme.colour.cerulean};
    margin: 0px;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
    :focus {
      outline: 3px solid ${globalTheme.colour.focusColour};
    }
  `;

  render() {
    const { css, children, fontSize, fontWeight, ...other } = this.props; // eslint-disable-line no-unused-vars

    return (
      <a css={[this.style, css]} {...other}>
        {children}
      </a>
    );
  }
}

AnchorLink.defaultProps = {
  fontSize: "inherit",
  fontWeight: "normal"
};
AnchorLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  css: PropTypes.string
};

export default AnchorLink;

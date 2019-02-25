import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
import { cx, css } from "emotion";

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
    const { className, children, fontSize, fontWeight, ...other } = this.props; // eslint-disable-line no-unused-vars

    return (
      <a className={cx(this.style, className)} {...other}>
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
  className: PropTypes.string
};

export default AnchorLink;

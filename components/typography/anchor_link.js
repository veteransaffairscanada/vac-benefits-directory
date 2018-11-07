import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
import { cx, css } from "react-emotion";

class AnchorLink extends Component {
  style = css`
    font-family: ${globalTheme.fontFamily};
    font-size: ${this.props.fontSize}px;
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
    const { className, children } = this.props;

    return (
      <a
        className={className ? cx(this.style, className) : this.style}
        {...this.props}
      >
        {children}
      </a>
    );
  }
}

AnchorLink.defaultProps = {
  fontSize: 14,
  fontWeight: "normal"
};
AnchorLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string,
  className: PropTypes.string
};

export default AnchorLink;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
import { cx, css } from "react-emotion";

const style = css`
  font-family: ${globalTheme.fontFamily};
  font-size: 24px;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    font-size: 16px;
  }
  font-weight: bold;
  color: ${globalTheme.colour.greyishBrown};
  margin: 0px;
`;

class Header3 extends Component {
  render() {
    const { className, children } = this.props;
    return (
      <div className={className ? cx(style, className) : style}>{children}</div>
    );
  }
}

Header3.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.string
};

export default Header3;

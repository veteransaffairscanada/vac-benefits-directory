import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
import { cx, css } from "react-emotion";

const style = css`
  font-family: ${globalTheme.fontFamily};
  font-size: 18px;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    font-size: 14px;
  }
  font-weight: bold;
  color: ${globalTheme.colour.greyishBrown};
  margin: 0px;
`;

class Header4 extends Component {
  render() {
    const { className, children } = this.props;
    return (
      <div className={className ? cx(style, className) : style}>{children}</div>
    );
  }
}

Header4.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.string
};

export default Header4;

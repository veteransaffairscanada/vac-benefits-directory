import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { cx, css } from "react-emotion";

const style = css`
  font-family: ${globalTheme.fontFamily};
  font-size: 18px;
  font-weight: bold;
  color: ${globalTheme.colour.greyishBrown};
  margin: 0px;
`;

class Header4 extends Component {
  render() {
    const { className, children } = this.props;
    return (
      <h4 className={className ? cx(style, className) : style}>{children}</h4>
    );
  }
}

Header4.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Header4;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { cx, css } from "react-emotion";

const style = css`
  font-family: ${globalTheme.fontFamily};
  font-size: 52px;
  font-weight: 900;
  color: ${globalTheme.colour.greyishBrown};
  margin: 0px;
`;

class Header1 extends Component {
  render() {
    const { className, children } = this.props;
    return (
      <h1 className={className ? cx(style, className) : style}>{children}</h1>
    );
  }
}

Header1.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Header1;

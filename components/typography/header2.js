import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
import { cx, css } from "react-emotion";

const style = css`
  font-family: ${globalTheme.fontFamily};
  font-size: 36px;
  font-weight: 900;
  color: ${globalTheme.colour.greyishBrown};
  margin: 0px;
`;

class Header2 extends Component {
  render() {
    const { className, children } = this.props;
    return (
      <h2 className={className ? cx(style, className) : style}>{children}</h2>
    );
  }
}

Header2.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Header2;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
import { cx, css } from "react-emotion";

const style = css`
  font-family: ${globalTheme.fontFamily};
  font-size: 52px;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    font-size: 30px;
  }
  font-weight: 900;
  color: ${globalTheme.colour.greyishBrown};
  margin: 0px;
`;

class Header1 extends Component {
  render() {
    const { className, children } = this.props;
    return (
      <span className={className ? cx(style, className) : style}>
        {children}
      </span>
    );
  }
}

Header1.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Header1;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
import { cx, css } from "emotion";

const style = css`
  font-family: ${globalTheme.fontFamilySansSerif};
  font-size: 24px;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    font-size: 16px;
  }
  font-weight: normal;
  color: ${globalTheme.colour.greyishBrown};
  margin: 0px;
`;

class OneLiner extends Component {
  render() {
    const { className, children } = this.props;
    return (
      <div className={className ? cx(style, className) : style}>{children}</div>
    );
  }
}
OneLiner.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.string
};
export default OneLiner;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { cx, css } from "react-emotion";
const style = css`
  font-family: ${globalTheme.fontFamily};
  font-size: 24px;
  font-weight: normal;
  color: #434343;
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

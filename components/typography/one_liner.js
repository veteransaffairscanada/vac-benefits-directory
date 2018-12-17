/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
import { css, jsx } from "@emotion/core";

const style = css`
  font-family: ${globalTheme.fontFamily};
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
    return <div css={className ? [style, className] : style}>{children}</div>;
  }
}
OneLiner.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.string
};
export default OneLiner;

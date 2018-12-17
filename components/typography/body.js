/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
import { css, jsx } from "@emotion/core";

const root = css`
  font-family: ${globalTheme.fontFamily};
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: ${globalTheme.colour.greyishBrown};
  margin-bottom: 25px;
`;

export class Body extends Component {
  render() {
    return <div css={[root, this.props.className]}>{this.props.children}</div>;
  }
}

Body.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  className: PropTypes.string
};

export default Body;

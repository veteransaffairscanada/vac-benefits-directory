import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const root = css`
  font-family: ${globalTheme.fontFamilySerif};
  font-size: 20px;
  font-weight: 300;
  line-height: 1.5;
  color: ${globalTheme.colour.navy};
  margin-bottom: 25px;
`;

export class Body extends Component {
  render() {
    return <div css={[root, this.props.styles]}>{this.props.children}</div>;
  }
}

Body.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  styles: PropTypes.object
};

export default Body;

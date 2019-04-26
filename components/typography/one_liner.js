import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

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
    const { children } = this.props;
    return (
      <div css={this.props.styles ? [style, this.props.styles] : style}>
        {children}
      </div>
    );
  }
}
OneLiner.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  styles: PropTypes.object
};
export default OneLiner;

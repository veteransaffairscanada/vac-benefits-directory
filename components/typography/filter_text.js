import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const style = css`
  font-family: ${globalTheme.fontFamilySansSerif};
  font-size: 14px;
  line-height: 21px;
  color: ${globalTheme.colour.greyishBrown};
  margin: 0px;
`;

class FilterText extends Component {
  render() {
    const { css, children, ...other } = this.props;
    return (
      <div css={css ? [style, css] : style} {...other}>
        {children}
      </div>
    );
  }
}

FilterText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  css: PropTypes.string
};

export default FilterText;

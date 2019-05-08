import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const needsTag = css`
  font-size: 14px;
  margin-right: ${globalTheme.unit};
  margin-bottom: ${globalTheme.unit};
  color: ${globalTheme.colour.slateGrey};
  border-radius: 1;
  display: inline-flex;
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    font-size: 12px;
  }
`;

export class NeedTag extends Component {
  render() {
    const { t, need, last } = this.props;
    return (
      <div css={needsTag}>
        {(t("current-language-code") === "en"
          ? need.nameEn.toUpperCase()
          : need.nameFr.toUpperCase()) + (last ? "" : ",")}
      </div>
    );
  }
}

NeedTag.propTypes = {
  need: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  last: PropTypes.bool
};

export default NeedTag;

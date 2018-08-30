import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { css } from "react-emotion";

const needsTag = css`
  margin-right: ${globalTheme.unit};
  margin-bottom: ${globalTheme.unit};
  color: #000000;
  border-radius: 1;
  display: inline-flex;
  padding: 4px 8px;
`;

export class NeedTag extends Component {
  render() {
    const { t, need } = this.props;
    return (
      <div className={needsTag} style={{ backgroundColor: need.colour }}>
        {t("current-language-code") === "en" ? need.nameEn : need.nameFr}
      </div>
    );
  }
}

NeedTag.propTypes = {
  need: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default NeedTag;

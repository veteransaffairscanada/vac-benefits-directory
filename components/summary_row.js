import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { Grid } from "@material-ui/core";
import EditIcon from "./icons/Edit";
import { globalTheme } from "../theme";
import { mutateUrl } from "../utils/common";
import HeaderLink from "./header_link";
import { connect } from "react-redux";

const rightAlign = css`
  text-align: right !important;
`;
const breadcrumbCss = css`
  border-top: 1px solid ${globalTheme.colour.warmGrey};
  padding-bottom: 15px;
  padding-top: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
`;
const bold = css`
  font-weight: 900;
`;
const font = css`
  font-size: 16px;
`;
const hideOnMobile = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    display: none;
  }
`;

export class SummaryRow extends Component {
  getAnswer = () => {
    const { reduxState, t, section } = this.props;
    const mco = reduxState.multipleChoiceOptions.filter(
      x => x.variable_name === reduxState[section]
    )[0];

    if (!mco && section !== "needs") {
      return <i>{t("ge.nothing_selected")}</i>;
    }

    if (mco && section !== "needs") {
      return t("current-language-code") === "en"
        ? mco.display_text_english
        : mco.display_text_french;
    }

    const selectedNeedsText = reduxState.needs
      .filter(x => Object.keys(reduxState.selectedNeeds).indexOf(x.id) > -1)
      .map(x => {
        return t("current-language-code") === "en" ? x.nameEn : x.nameFr;
      });

    if (selectedNeedsText.length === 0) {
      return <i>{t("ge.nothing_selected")}</i>;
    }
    return selectedNeedsText.join(", ");
  };

  render() {
    const { section, key, url, t, reduxState } = this.props;
    const question = reduxState.questions.filter(
      x => x.variable_name === section
    )[0];

    return (
      <li className={breadcrumbCss} key={key}>
        <Grid container>
          <Grid item xs={9}>
            <div className={bold}>
              {t("current-language-code") === "en"
                ? question.summary_english
                : question.summary_french}
            </div>
            <div>{this.getAnswer()}</div>
          </Grid>
          <Grid item xs={3} className={rightAlign}>
            <HeaderLink
              href={mutateUrl(url, "/index", { section: section })}
              className={font}
            >
              <EditIcon
                focusable="true"
                aria-hidden="false"
                role="img"
                aria-label={t("alt_text.edit")}
                height="5px"
              />
              <span className={hideOnMobile}>{t("ge.edit")}</span>
            </HeaderLink>
          </Grid>
        </Grid>
      </li>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};
SummaryRow.propTypes = {
  reduxState: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  key: PropTypes.object
};

export default connect(mapStateToProps)(SummaryRow);

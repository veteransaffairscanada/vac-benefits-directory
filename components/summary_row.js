import { Component } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Grid } from "@material-ui/core";
// import EditIcon from "./icons/Edit";
import Icon from "./icon";
import { globalTheme } from "../theme";
import { mutateUrl, getPageName } from "../utils/common";
import HeaderLink from "./header_link";
import { connect } from "react-redux";

const rightAlign = css`
  text-align: right !important;
  padding-top: 12px;
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
  padding-bottom: 7px;
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
    const { reduxState, t, questionName } = this.props;
    const mco = reduxState.multipleChoiceOptions.filter(
      x => x.variable_name === reduxState[questionName]
    )[0];

    if (!mco && questionName !== "needs") {
      return <i>{t("ge.nothing_selected")}</i>;
    }

    if (mco && questionName !== "needs") {
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
    const { questionName, url, t, reduxState } = this.props;
    const question = reduxState.questions.filter(
      x => x.variable_name === questionName
    )[0];

    return (
      <li css={breadcrumbCss}>
        <Grid container>
          <Grid item xs={9}>
            <div css={bold}>
              {t("current-language-code") === "en"
                ? question.summary_english
                : question.summary_french}
            </div>
            <div>{this.getAnswer()}</div>
          </Grid>
          <Grid item xs={3} css={rightAlign}>
            <HeaderLink
              href={mutateUrl(url, "/" + getPageName(questionName))}
              css={font}
            >
              <Icon
                icon="edit"
                focusable="true"
                aria-hidden="false"
                role="img"
                aria-label={t("alt_text.edit")}
              />
              <span id={"edit-" + questionName} css={hideOnMobile}>
                {t("ge.edit")}
              </span>
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
  questionName: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(SummaryRow);

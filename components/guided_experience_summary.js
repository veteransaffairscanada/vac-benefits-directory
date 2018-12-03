import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { css } from "react-emotion";
import { globalTheme } from "../theme";
import AnchorLink from "./typography/anchor_link";
import { connect } from "react-redux";
import { mutateUrl, showQuestion } from "../utils/common";
import EditIcon from "./icons/Edit";

const outerDiv = css`
  padding: 12px;
`;

const breadcrumbCss = css`
  border-top: 1px solid ${globalTheme.colour.warmGrey};
  padding-bottom: 15px;
  padding-top: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 24px;
`;

const breadcrumbList = css`
  border-bottom: 1px solid ${globalTheme.colour.warmGrey};
  padding-left: 0;
  width: 100%;
`;

const rightAlign = css`
  text-align: right !important;
`;

export class GuidedExperienceSummary extends Component {
  getOptionBreadcrumbText = option => {
    if (this.props.t("current-language-code") === "en") {
      return option.ge_breadcrumb_english
        ? option.ge_breadcrumb_english
        : option.display_text_english;
    } else {
      return option.ge_breadcrumb_french
        ? option.ge_breadcrumb_french
        : option.display_text_french;
    }
  };

  getQuestionBreadcrumbText = question => {
    if (this.props.t("current-language-code") === "en") {
      return question.breadcrumb_english;
    } else {
      return question.breadcrumb_french;
    }
  };

  getLiElement = (content, section, key) => {
    return (
      <li className={breadcrumbCss} key={key}>
        <Grid container>
          <Grid item xs={9}>
            {content}
          </Grid>
          <Grid item xs={3} className={rightAlign}>
            <AnchorLink
              href={mutateUrl(this.props.url, "/index", { section: section })}
              fontSize={24}
            >
              <EditIcon t={this.props.t} />
            </AnchorLink>
          </Grid>
        </Grid>
      </li>
    );
  };

  breadcrumbs = () => {
    const { t, reduxState, url } = this.props;
    reduxState.questions.map(x => x.variable_name);
    const questionVariableNames = reduxState.questions
      .map(x => x.variable_name)
      .filter((x, i) => showQuestion(x, i, reduxState));
    let jsx_array = questionVariableNames.map((k, i) => {
      const question = reduxState.questions.filter(
        x => x.variable_name === k
      )[0];
      let crumb;
      if (
        !reduxState[k] ||
        (k === "needs" && Object.keys(reduxState.selectedNeeds).length == 0)
      ) {
        crumb = (
          <div>
            {this.getQuestionBreadcrumbText(question) +
              " " +
              t("ge.not_selected")}
          </div>
        );
      } else {
        let breadcrumbText;
        if (k === "needs") {
          const selectedNeeds = reduxState.needs
            .filter(
              x => Object.keys(reduxState.selectedNeeds).indexOf(x.id) > -1
            )
            .map(x => {
              return t("current-language-code") === "en" ? x.nameEn : x.nameFr;
            });
          breadcrumbText = selectedNeeds.join(", ");
        } else {
          let option = reduxState.multipleChoiceOptions.filter(
            x => x.variable_name === reduxState[k]
          )[0];
          breadcrumbText = this.getOptionBreadcrumbText(option);
        }
        crumb = (
          <AnchorLink
            href={mutateUrl(url, "/index", { section: k })}
            fontSize={24}
          >
            {breadcrumbText}
          </AnchorLink>
        );
      }
      return this.getLiElement(crumb, k, i);
    });
    return jsx_array;
  };

  render() {
    return (
      <div className={outerDiv}>
        <ul className={breadcrumbList}>{this.breadcrumbs()}</ul>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

GuidedExperienceSummary.propTypes = {
  reduxState: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(GuidedExperienceSummary);

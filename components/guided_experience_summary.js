import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { css } from "react-emotion";
import { globalTheme } from "../theme";
import AnchorLink from "./typography/anchor_link";
import { connect } from "react-redux";
import { mutateUrl } from "../utils/common";

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
  text-align: right;
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

  breadcrumbs = () => {
    const { t, reduxState, url } = this.props;
    const questionVariableNames = reduxState.questions
      .map(x => x.variable_name)
      .filter(x => x != "needs");
    let jsx_array = questionVariableNames.map((k, i) => {
      const question = reduxState.questions.filter(
        x => x.variable_name === k
      )[0];
      let content;
      if (!reduxState[k]) {
        content = (
          <div>
            {this.getQuestionBreadcrumbText(question) +
              " " +
              t("ge.not_selected")}
          </div>
        );
      } else {
        let option = reduxState.multipleChoiceOptions.filter(
          x => x.variable_name === reduxState[k]
        )[0];
        content = (
          <AnchorLink
            href={mutateUrl(url, "/index", { section: k })}
            fontSize={24}
          >
            {this.getOptionBreadcrumbText(option)}
          </AnchorLink>
        );
      }
      return (
        <li className={breadcrumbCss} key={i}>
          <Grid container>
            <Grid item xs={9}>
              {content}
            </Grid>
            <Grid item xs={3} className={rightAlign}>
              <AnchorLink
                href={mutateUrl(url, "/index", { section: k })}
                fontSize={24}
              >
                edit
              </AnchorLink>
            </Grid>
          </Grid>
        </li>
      );
    });
    return jsx_array;
  };

  render() {
    // const { t, reduxState } = this.props;
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

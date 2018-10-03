import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { css } from "react-emotion";
import Router from "next/router";
import Container from "./container";
import FilterText from "./typography/filter_text";
import Header2 from "./typography/header2";
import Button from "./button";
import HeaderButton from "./header_button";
import GuidedExperienceLink from "./typography/guided_experience_link";
import { globalTheme } from "../theme";

const root = css`
  border: solid 1px grey;
  background-color: white;
  margin: 15px;
`;

const box = css`
  padding: 25px 63px 63px 63px;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    padding: 17px 26px 55px 26px;
  }
  display: inline-flex;
`;

const prevButton = css`
  margin-top: 50px !important;
  margin-left: 5px !important;
`;

const comma = css`
  margin-right: 0.5em;
`;

const questions = css`
  margin: 0;
  padding: 0;
`;

export class GuidedExperience extends Component {
  jumpButtons = (t, reduxState) => {
    const getTranslationKey = questionVariableName => {
      let translation_key = "";
      if (questionVariableName === "serviceHealthIssue") {
        translation_key = JSON.parse(reduxState[questionVariableName])
          ? "GE.has service related health issue"
          : "GE.no service related health issue";
      } else {
        translation_key = reduxState[questionVariableName];
      }
      return translation_key;
    };

    const eligibilityKeys = reduxState.questions
      .map(x => x.variable_name)
      .filter(x => x != "needs");
    let jsx_array = eligibilityKeys.map((k, i) => {
      if (!reduxState[k] || k === this.props.id) {
        return "";
      } else {
        return (
          <span key={i}>
            <span className={comma}>{i === 0 ? "" : ","}</span>
            <GuidedExperienceLink
              id={"jumpButton" + i}
              href="#"
              onClick={() => this.props.setSection(k)}
            >
              {t(getTranslationKey(k))}
            </GuidedExperienceLink>
          </span>
        );
      }
    });
    return jsx_array;
  };

  render() {
    const { t, reduxState } = this.props;

    let benefitsDirectoryUrl =
      "/benefits-directory?lng=" + t("current-language-code");
    if (Object.keys(reduxState.selectedNeeds).length > 0) {
      benefitsDirectoryUrl +=
        "&selectedNeeds=" + Object.keys(reduxState.selectedNeeds).join();
    }
    reduxState.questions
      .map(q => q.variable_name)
      .filter(x => x !== "needs")
      .forEach(selection => {
        if (reduxState[selection] !== "") {
          benefitsDirectoryUrl += `&${selection}=${reduxState[selection]}`;
        }
      });

    const jumpButtons = this.jumpButtons(t, reduxState);

    return (
      <Container id="guidedExperience">
        <HeaderButton
          id="prevButton"
          disableRipple
          href={
            this.props.prevSection === "index"
              ? "/index?lng=" + t("current-language-code")
              : undefined
          }
          onClick={
            this.props.prevSection === "index"
              ? undefined
              : () => this.props.setSection(this.props.prevSection)
          }
          className={prevButton}
          arrow="back"
        >
          {t("back")}
        </HeaderButton>
        <div className={root}>
          <Grid container spacing={24} className={box}>
            <Grid item xs={12} md={12}>
              <FilterText style={{ display: "inline-block" }}>
                {t("B3.Filter by eligibility")}
              </FilterText>
              {jumpButtons}
            </Grid>

            <Grid item xs={12} className={questions}>
              <Header2>{this.props.subtitle}</Header2>
              {this.props.children}
            </Grid>

            <Grid item xs={12}>
              <Button
                id="nextButton"
                arrow={true}
                onClick={
                  this.props.nextSection === "benefits-directory"
                    ? () => Router.push(benefitsDirectoryUrl)
                    : () => this.props.setSection(this.props.nextSection)
                }
              >
                {this.props.id === "needs" ? t("ge.show_results") : t("next")}{" "}
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

GuidedExperience.propTypes = {
  id: PropTypes.string.isRequired,
  nextSection: PropTypes.string.isRequired,
  prevSection: PropTypes.string,
  t: PropTypes.func.isRequired,
  setSection: PropTypes.func.isRequired,
  subtitle: PropTypes.string.isRequired,
  stepNumber: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,
  reduxState: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(GuidedExperience);

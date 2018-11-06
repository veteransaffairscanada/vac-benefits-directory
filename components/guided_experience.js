import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { css } from "react-emotion";
import Router from "next/router";
import Container from "./container";
import FilterText from "./typography/filter_text";
import Header2 from "./typography/header2";
import Body from "./typography/body";
import Button from "./button";
import HeaderButton from "./header_button";
import GuidedExperienceLink from "./typography/guided_experience_link";
import { globalTheme } from "../theme";
import Paper from "./paper";

const box = css`
  padding: 25px 63px 63px 63px;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    padding: 17px 26px 55px 26px;
  }
  display: inline-flex;
`;
const prevButton = css`
  margin-top: 50px;
  margin-bottom: 15px;
`;
const comma = css`
  margin-right: 0.5em;
`;
const questions = css`
  margin: 0;
  padding: 0;
`;
const body = css`
  margin-top: 5px;
  margin-bottom: 0px;
`;

export class GuidedExperience extends Component {
  jumpButtons = (t, reduxState) => {
    const eligibilityKeys = reduxState.questions
      .map(x => x.variable_name)
      .filter(x => x != "needs");
    let jsx_array = eligibilityKeys.map((k, i) => {
      if (!reduxState[k] || k === this.props.id) {
        return "";
      } else {
        let option = reduxState.multipleChoiceOptions.filter(
          x => x.variable_name === reduxState[k]
        )[0];
        let text;
        if (t("current-language-code") === "en") {
          text = option.ge_breadcrumb_english
            ? option.ge_breadcrumb_english
            : option.display_text_english;
        } else {
          text = option.ge_breadcrumb_french
            ? option.ge_breadcrumb_french
            : option.display_text_french;
        }

        return (
          <span key={i}>
            <span className={comma}>{i === 0 ? "" : ","}</span>
            <GuidedExperienceLink
              id={"jumpButton" + i}
              href="#"
              onClick={() => this.props.setSection(k)}
            >
              {text}
            </GuidedExperienceLink>
          </span>
        );
      }
    });
    return jsx_array;
  };

  render() {
    const {
      t,
      reduxState,
      prevSection,
      nextSection,
      subtitle,
      setSection,
      helperText
    } = this.props;

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
            prevSection === "index"
              ? "/index?lng=" + t("current-language-code")
              : undefined
          }
          onClick={
            prevSection === "index" ? undefined : () => setSection(prevSection)
          }
          className={prevButton}
          arrow="back"
        >
          {t("back")}
        </HeaderButton>
        <Paper padding="md" className={box}>
          <Grid container spacing={24}>
            <Grid item xs={12} md={12}>
              <FilterText style={{ display: "inline-block" }}>
                {t("B3.Filter by eligibility")}
              </FilterText>
              {jumpButtons}
            </Grid>

            <Grid item xs={12} className={questions}>
              <h1>
                <Header2>{subtitle}</Header2>
              </h1>
              {helperText ? <Body className={body}>{helperText}</Body> : null}
              {this.props.children}
            </Grid>

            <Grid item xs={12}>
              <Button
                id="nextButton"
                arrow={true}
                onClick={
                  nextSection === "benefits-directory"
                    ? () => Router.push(benefitsDirectoryUrl)
                    : () => setSection(nextSection)
                }
              >
                {this.props.id === "needs" ? t("ge.show_results") : t("next")}{" "}
              </Button>
            </Grid>
          </Grid>
        </Paper>
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
  helperText: PropTypes.string,
  stepNumber: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,
  reduxState: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(GuidedExperience);

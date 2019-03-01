import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { css } from "emotion";
import Container from "./container";
import Header from "./typography/header";
import Body from "./typography/body";
import HeaderLink from "./header_link";
import BreadCrumbs from "./breadcrumbs";
import { globalTheme } from "../theme";
import Paper from "./paper";
import { mutateUrl } from "../utils/common";
import { connect } from "react-redux";
import { showQuestion, getPageName } from "../utils/common";
import HeaderButton from "./header_button";
import Button from "./button";
import Link from "next/link";
import { getHomeUrl } from "../selectors/urls";
import { AlphaBanner } from "./alpha_banner";

const greyBox = css`
  background-color: ${globalTheme.colour.paleGreyTwo};
  margin-top: 34px;
  padding: 35px 43px;
  p:first-of-type {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    font-size: 14px;
    padding: 27px 18px;
  }
`;

const box = css`
  padding: 35px;
  padding-top: 24px;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    padding: 17px 26px 55px 26px;
  }
`;
const alignRight = css`
  text-align: right;
`;
const mobileReverse = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    flex-direction: column-reverse;
  }
`;
const mobileFullWidth = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    width: 100%;
    padding: 0;
    margin-left: 0;
  }
`;
const questions = css`
  margin: 0;
  padding: 0;
`;
const body = css`
  margin-top: 5px;
  margin-bottom: 0px;
  font-size: 24px;
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    font-size: 14px;
  }
`;
const leftMargin = css`
  margin-left: 1.5em;
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    margin-left: 0;
    margin-bottom: 0.5em;
  }
`;
export class GuidedExperience extends Component {
  getSubtitle = question => {
    if (this.props.t("current-language-code") === "en") {
      return question["guided_experience_english"];
    } else {
      return question["guided_experience_french"];
    }
  };

  queryParamsToClearHiddenQuestions() {
    let queryObj = {};
    this.props.reduxState.questions
      .map(x => x.variable_name)
      .filter((x, i) => !showQuestion(x, i, this.props.reduxState))
      .forEach(x => {
        if (x === "needs") {
          queryObj["selectedNeeds"] = {};
        } else {
          queryObj[x] = "";
        }
      });
    return queryObj;
  }

  getPrevSection() {
    const displayable_sections = this.props.sectionOrder.filter((x, i) =>
      showQuestion(x, i, this.props.reduxState)
    );
    const dynamicStepNumber = displayable_sections.indexOf(this.props.id);
    return displayable_sections[dynamicStepNumber - 1];
  }

  getNextUrl() {
    const { reduxState, sectionOrder, id, url } = this.props;
    const displayable_sections = sectionOrder.filter((x, i) =>
      showQuestion(x, i, reduxState)
    );
    const dynamicStepNumber = displayable_sections.indexOf(id);
    const nextSection =
      dynamicStepNumber + 1 >= displayable_sections.length
        ? "benefitsDirectory"
        : displayable_sections[dynamicStepNumber + 1];

    let nextQueryParams = this.queryParamsToClearHiddenQuestions();
    if (id === "needs") {
      nextQueryParams.selectedNeeds = Object.keys(
        reduxState.selectedNeeds
      ).join();
    } else {
      nextQueryParams[id] = JSON.parse(JSON.stringify(reduxState[id]));
    }

    return mutateUrl(url, "/" + getPageName(nextSection), nextQueryParams);
  }

  getSkipUrl() {
    const { reduxState, sectionOrder, id, url } = this.props;

    var reduxStateCopy = JSON.parse(JSON.stringify(reduxState));
    if (id === "needs") {
      reduxStateCopy.selectedNeeds = {};
    } else {
      reduxStateCopy[id] = "";
    }
    let skipQueryParams = this.queryParamsToClearHiddenQuestions();

    const stepNumber = sectionOrder.indexOf(id);
    sectionOrder.forEach((x, i) => {
      if (i > stepNumber && x !== "needs") {
        skipQueryParams[x] = "";
        reduxStateCopy[x] = "";
      }
    });
    let displayable_sections = sectionOrder.filter((x, i) =>
      showQuestion(x, i, reduxStateCopy)
    );
    const dynamicStepNumber = displayable_sections.indexOf(id);
    const nextSection =
      dynamicStepNumber + 1 >= displayable_sections.length
        ? "benefitsDirectory"
        : displayable_sections[dynamicStepNumber + 1];

    if (id === "needs") {
      skipQueryParams.selectedNeeds = {};
    } else {
      skipQueryParams[id] = "";
    }

    return mutateUrl(url, "/" + getPageName(nextSection), skipQueryParams);
  }

  render() {
    const { t, url, id, reduxState, homeUrl } = this.props;
    const question = reduxState.questions.filter(
      x => x.variable_name === id
    )[0];

    const backUrl =
      id === "patronType"
        ? t("ge.home_link")
        : mutateUrl(
            url,
            "/" + getPageName(this.getPrevSection()),
            this.queryParamsToClearHiddenQuestions()
          );

    return (
      <Container id="mainContent" mobileFullWidth={true}>
        <div>
          <BreadCrumbs
            t={t}
            breadcrumbs={[]}
            homeUrl={homeUrl}
            pageTitle={t("ge.Find benefits and services")}
          />
        </div>
        <Paper padding="md" className={box}>
          <AlphaBanner t={t} url={url} />
          <Grid container spacing={24}>
            {id === "patronType" ? (
              <React.Fragment>
                <Grid item xs={12}>
                  <Header size="xl" headingLevel="h1">
                    {t("ge.Find benefits and services")}
                  </Header>
                  {id === "patronType" ? (
                    <React.Fragment>
                      <Body className={greyBox}>
                        <p>{t("ge.intro_text_p1")}</p>
                        <p>{t("ge.intro_text_p2")}</p>
                      </Body>
                    </React.Fragment>
                  ) : null}
                </Grid>
              </React.Fragment>
            ) : null}
            <Grid item xs={12} className={questions}>
              <Header size="md_lg" headingLevel="h2">
                {this.getSubtitle(question)}
              </Header>
              {question.tooltip_english && question.tooltip_english !== "" ? (
                <Body className={body}>
                  {t("current-language-code") === "en"
                    ? question.tooltip_english
                    : question.tooltip_french}
                </Body>
              ) : null}
              {this.props.children}
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={16}>
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={8} className={mobileReverse}>
                    <HeaderLink
                      id="prevButton"
                      href={backUrl}
                      className={mobileFullWidth}
                      hasBorder
                    >
                      {t("back")}
                    </HeaderLink>
                    <Link id="nextLink" href={this.getNextUrl()}>
                      <Button
                        id="nextButton"
                        mobileFullWidth={true}
                        className={leftMargin}
                      >
                        {this.getNextUrl().indexOf("benefits-directory") > -1
                          ? t("ge.show_results")
                          : t("next")}
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4} className={alignRight}>
                  <Link id="skipLink" href={this.getSkipUrl()}>
                    <HeaderButton
                      id="skipButton"
                      altStyle="grey"
                      className={mobileFullWidth}
                    >
                      {t("ge.skip")}
                    </HeaderButton>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = (reduxState, props) => {
  return {
    reduxState: reduxState,
    sectionOrder: reduxState.questions.map(x => x.variable_name),
    homeUrl: getHomeUrl(reduxState, props)
  };
};

GuidedExperience.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.object.isRequired,
  reduxState: PropTypes.object.isRequired,
  sectionOrder: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  store: PropTypes.object,
  homeUrl: PropTypes.string
};

export default connect(mapStateToProps)(GuidedExperience);

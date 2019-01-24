import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { css } from "emotion";
import Container from "./container";
import Header from "./typography/header";
import Body from "./typography/body";
import HeaderLink from "./header_link";
import { globalTheme } from "../theme";
import Paper from "./paper";
import { mutateUrl } from "../utils/common";
import { connect } from "react-redux";
import { showQuestion, getPageName } from "../utils/common";
import HeaderButton from "./header_button";
import Button from "./button";
import Link from "next/link";

const box = css`
  padding: 63px 63px 63px 63px;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    padding: 17px 26px 55px 26px;
  }
  display: inline-flex;
`;
const prevButton = css`
  margin-top: 50px;
  margin-bottom: 15px;
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
  getSubtitle = question => {
    if (this.props.t("current-language-code") === "en") {
      return question["guided_experience_english"];
    } else {
      return question["guided_experience_french"];
    }
  };

  queryParamsToClear() {
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

  render() {
    const { t, helperText, url, id, reduxState, sectionOrder } = this.props;
    const question = reduxState.questions.filter(
      x => x.variable_name === id
    )[0];
    const displayable_sections = sectionOrder.filter((x, i) =>
      showQuestion(x, i, reduxState)
    );
    const dynamicStepNumber = displayable_sections.indexOf(id);
    const prevSection = displayable_sections[dynamicStepNumber - 1];
    const nextSection =
      dynamicStepNumber + 1 >= displayable_sections.length
        ? "summary"
        : displayable_sections[dynamicStepNumber + 1];

    let nextQueryParams = this.queryParamsToClear();
    let skipQueryParams = this.queryParamsToClear();
    if (id === "needs") {
      nextQueryParams.selectedNeeds = Object.keys(
        reduxState.selectedNeeds
      ).join();
      skipQueryParams.selectedNeeds = {};
    } else {
      nextQueryParams[id] = JSON.parse(JSON.stringify(reduxState[id]));
      skipQueryParams[id] = "";
    }

    return (
      <Container id="mainContent">
        <HeaderLink
          id="prevButton"
          href={mutateUrl(
            url,
            "/" + getPageName(prevSection),
            this.queryParamsToClear()
          )}
          className={prevButton}
          arrow="back"
        >
          {t("back")}
        </HeaderLink>

        {id === "patronType" ? (
          <React.Fragment>
            <Header size="lg" headingLevel="h1">
              {t("ge.Find benefits and services")}
            </Header>
            <Body>
              <p>{t("ge.intro_text_p1")}</p>
              <p>{t("ge.intro_text_p2")}</p>
            </Body>
          </React.Fragment>
        ) : null}

        <Paper padding="md" className={box}>
          <Grid container spacing={24}>
            <Grid item xs={12} className={questions}>
              <Header size="md_lg" headingLevel="h2">
                {this.getSubtitle(question)}
              </Header>
              {helperText ? <Body className={body}>{helperText}</Body> : null}
              {this.props.children}
            </Grid>
            <Grid item xs={12}>
              <Link
                href={mutateUrl(
                  url,
                  "/" + getPageName(nextSection),
                  nextQueryParams
                )}
              >
                <Button id="nextButton" arrow={true}>
                  {t("next")}{" "}
                </Button>
              </Link>
              <Link
                href={mutateUrl(
                  url,
                  "/" + getPageName(nextSection),
                  skipQueryParams
                )}
              >
                <HeaderButton id="skipButton" altStyle="grey">
                  {t("ge.skip")}
                </HeaderButton>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState,
    sectionOrder: reduxState.questions.map(x => x.variable_name)
  };
};

GuidedExperience.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.object.isRequired,
  reduxState: PropTypes.object.isRequired,
  sectionOrder: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  helperText: PropTypes.string,
  children: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(GuidedExperience);

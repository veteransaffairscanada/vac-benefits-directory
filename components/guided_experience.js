import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { css } from "emotion";
import Router from "next/router";
import Container from "./container";
import Header from "./typography/header";
import Body from "./typography/body";
import NextSkipButtons from "./next_skip_buttons";
import HeaderButton from "./header_button";
import HeaderLink from "./header_link";
import { globalTheme } from "../theme";
import Paper from "./paper";
import { mutateUrl } from "../utils/common";
import { connect } from "react-redux";
import { showQuestion } from "../utils/common";

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
  queryParamsToClear() {
    return this.props.reduxState.questions
      .map(x => x.variable_name)
      .filter((x, i) => !showQuestion(x, i, this.props.reduxState))
      .map(x => {
        if (x === "needs") {
          return { key: "selectedNeeds", value: {} };
        } else {
          return { key: x, value: "" };
        }
      });
  }

  render() {
    const { t, prevSection, subtitle, helperText, url, id } = this.props;

    return (
      <Container id="mainContent">
        {prevSection === "index" ? (
          <HeaderLink
            id="prevButton"
            href={t("ge.home_link")}
            className={prevButton}
            arrow="back"
          >
            {t("back")}
          </HeaderLink>
        ) : (
          <HeaderButton
            id="prevButton"
            onClick={() => {
              let params = { section: prevSection };
              this.queryParamsToClear().forEach(x => {
                params[x.key] = x.value;
              });
              Router.push(mutateUrl(url, "/", params));
              document.body.focus();
              window.scrollTo(0, 0);
            }}
            className={prevButton}
            arrow="back"
          >
            {t("back")}
          </HeaderButton>
        )}

        {this.props.stepNumber === 0 ? (
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
                {subtitle}
              </Header>
              {helperText ? <Body className={body}>{helperText}</Body> : null}
              {this.props.children}
            </Grid>
            <Grid item xs={12}>
              <NextSkipButtons t={t} id={id} url={url} />
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
  prevSection: PropTypes.string,
  t: PropTypes.func.isRequired,
  subtitle: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  stepNumber: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(GuidedExperience);

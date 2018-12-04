import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { css } from "react-emotion";
import Router from "next/router";
import Container from "./container";
import Header from "./typography/header";
import Body from "./typography/body";
import Button from "./button";
import HeaderButton from "./header_button";
import HeaderLink from "./header_link";
import { globalTheme } from "../theme";
import Paper from "./paper";
import { mutateUrl } from "../utils/common";

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
  render() {
    const {
      t,
      prevSection,
      nextSection,
      subtitle,
      setSection,
      helperText,
      url
    } = this.props;

    return (
      <Container id="guidedExperience">
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
              setSection(prevSection);
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
              <Button
                id="nextButton"
                arrow={true}
                onClick={
                  nextSection === "summary"
                    ? () =>
                        Router.push(mutateUrl(url, "/summary", { section: "" }))
                    : () => setSection(nextSection)
                }
              >
                {t("next")}{" "}
              </Button>
              <HeaderButton
                id="skipButton"
                altStyle="grey"
                onClick={
                  nextSection === "summary"
                    ? () =>
                        Router.push(mutateUrl(url, "/summary", { section: "" }))
                    : () => setSection(nextSection)
                }
              >
                {t("ge.skip")}
              </HeaderButton>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

GuidedExperience.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.object.isRequired,
  nextSection: PropTypes.string.isRequired,
  prevSection: PropTypes.string,
  t: PropTypes.func.isRequired,
  setSection: PropTypes.func.isRequired,
  subtitle: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  stepNumber: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default GuidedExperience;

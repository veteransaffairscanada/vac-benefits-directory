import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { css } from "react-emotion";
import Router from "next/router";
import { globalTheme } from "../theme";
import Container from "./container";
import Header1 from "./header1";
import Header2 from "./header2";
import Button from "./button";
import HeaderAnchorLink from "./header_anchor_link";

const root = css`
  border: solid 1px grey;
  background-color: white;
  margin: 15px;
`;

const box = css`
  padding: 20px;
  display: inline-flex;
`;

const prevButton = css`
  margin-top: 50px !important;
  margin-left: 5px !important;
`;

const title = css`
  font-size: 14px !important;
  line-height: 21px;
  width: 100px;
  display: inline-block;
`;

const jumpButton = css`
  font-size: 14px !important;
  line-height: 21px;
  color: ${globalTheme.colour.cerulean};
`;

const comma = css`
  margin-right: 0.5em;
`;

const questions = css`
  margin: 0;
  padding: 0;
`;

export class GuidedExperience extends Component {
  sectionMap = {
    patronType: "patronTypeQuestion",
    serviceType: "serviceTypeQuestion",
    statusAndVitals: "statusAndVitalsQuestion",
    serviceHealthIssue: "serviceHealthIssueQuestion"
  };

  render() {
    const { t, selectedEligibility } = this.props;
    const eligibilityKeys = Object.keys(selectedEligibility);
    return (
      <Container id="guidedExperience">
        <HeaderAnchorLink
          id="prevButton"
          disableRipple
          href={
            this.props.prevSection === "index" ? this.props.indexURL : undefined
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
        </HeaderAnchorLink>
        <div className={root}>
          <Grid container spacing={24} className={box}>
            <Grid item xs={12} md={12}>
              <Header1 className={title}>
                {t("B3.Filter by eligibility")}
              </Header1>

              {eligibilityKeys.map((k, i) => {
                if (
                  selectedEligibility[k] === "" ||
                  this.sectionMap[k] === this.props.id
                ) {
                  return "";
                } else {
                  let translation_key = "";
                  if (k === "serviceHealthIssue") {
                    translation_key = JSON.parse(selectedEligibility[k])
                      ? "GE.has service related health issue"
                      : "GE.no service related health issue";
                  } else {
                    translation_key = selectedEligibility[k];
                  }

                  return (
                    <span key={i}>
                      <span className={comma}>{i === 0 ? "" : ","}</span>
                      <a
                        id={"jumpButton" + i}
                        className={jumpButton}
                        href="#"
                        onClick={() =>
                          this.props.setSection(this.sectionMap[k])
                        }
                      >
                        {t(translation_key)}
                      </a>
                    </span>
                  );
                }
              })}
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
                    ? () => Router.push(this.props.benefitsDirectoryUrl)
                    : () => this.props.setSection(this.props.nextSection)
                }
              >
                {this.props.id === "needsQuestion"
                  ? t("ge.show_results")
                  : t("next")}{" "}
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
    selectedEligibility: {
      patronType: reduxState.patronType,
      serviceType: reduxState.serviceType,
      statusAndVitals: reduxState.statusAndVitals,
      serviceHealthIssue: reduxState.serviceHealthIssue
    }
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
  selectedEligibility: PropTypes.object.isRequired,
  store: PropTypes.object,
  benefitsDirectoryUrl: PropTypes.string,
  indexURL: PropTypes.string
};

export default connect(mapStateToProps)(GuidedExperience);

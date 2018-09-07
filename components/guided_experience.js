import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { connect } from "react-redux";
import { css } from "react-emotion";
import Container from "../components/container";
import Header1 from "../components/header1";
import Header2 from "../components/header2";
import { globalTheme } from "../theme";

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
  margin-top: 20px !important;
  margin-left: 15px !important;
  text-transform: none;
`;

const nextButton = css`
  background-color: #39824d !important;
  color: #ffffff !important;
  margin-top: 0 !important;
  margin: 25px !important;
  text-transform: none !important;
  &:hover {
    background: #295f38 !important;
  }
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
        <Button
          size="medium"
          href={
            this.props.prevSection === "index" ? this.props.indexURL : undefined
          }
          onClick={
            this.props.prevSection === "index"
              ? undefined
              : () => this.props.setSection(this.props.prevSection)
          }
          className={prevButton}
        >
          <ArrowBack />
          &nbsp; &nbsp; {t("back")}
        </Button>
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
          </Grid>

          <Button
            id="nextButton"
            size="medium"
            href={
              this.props.nextSection === "benefits-directory"
                ? this.props.benefitsDirectoryUrl
                : undefined
            }
            onClick={
              this.props.nextSection === "benefits-directory"
                ? undefined
                : () => this.props.setSection(this.props.nextSection)
            }
            className={nextButton}
          >
            {this.props.id === "needsQuestion"
              ? t("ge.show_results")
              : t("next")}{" "}
            &nbsp; &nbsp;
            <ArrowForward />
          </Button>
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

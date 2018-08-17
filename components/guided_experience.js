import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styled, { css } from "react-emotion";
import { globalTheme } from "../theme";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#1A237E",
      main: "#E8EAF6",
      dark: "#0000FF",
      contrastText: "#fff"
    }
  },
  typography: { fontFamily: ["Merriweather", "serif"] }
});

const BlueBar = styled("div")`
  background-color: blue;
  height: 5px;
  width: 100px;
  margin-bottom: 40px;
`;

const root = css`
  border: solid 1px grey;
  background-color: white;
  margin: 15px;
`;

const box = css`
  padding: 20px;
`;

const container = css`
  margin: 0 auto;
  max-width: ${globalTheme.maxWidth};
  padding-left: 16px;
  padding-right: 16px;
`;

const prevButton = css`
  margin-top: 20px !important;
  margin-left: 15px !important;
  text-transform: none;
`;

const nextButton = css`
  background-color: black !important;
  color: white;
  margin-top: 0 !important;
  margin: 25px !important;
  text-transform: none;
  &:hover {
    background: #606060 !important;
  }
`;

const title = css`
  font-size: 1.5em !important;
  color: black;
`;

const subTitle = css`
  font-size: 1em !important;
`;

const jumpButton = css`
  font-size: 1.5em;
`;

const comma = css`
  margin-right: 0.5em;
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
      <MuiThemeProvider theme={theme}>
        <div id="guidedExperience" className={container}>
          <Button
            size="medium"
            href={
              this.props.prevSection === "index"
                ? this.props.indexURL
                : undefined
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
              <Grid item xs={12} md={3}>
                <Typography className={title}>
                  {t("B3.Filter by eligibility")}
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
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

              <Grid item xs={12}>
                <BlueBar />
                <Typography className={subTitle}>
                  {this.props.subtitle}
                </Typography>
              </Grid>

              <Grid item xs={12}>
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
              {t("next")} &nbsp; &nbsp;
              <ArrowForward />
            </Button>
          </div>
        </div>
      </MuiThemeProvider>
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

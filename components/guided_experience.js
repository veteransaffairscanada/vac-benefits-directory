import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styled from "react-emotion";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#1A237E",
      main: "#E8EAF6",
      dark: "#0000FF", // '#002884',
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

const styles = () => ({
  root: {
    border: "solid 1px grey",
    backgroundColor: "white",
    marginTop: "5px",
    margin: "15px"
  },
  box: {
    padding: "20px"
  },
  container: {
    margin: "0 auto",
    maxWidth: "1200px",
    paddingLeft: "16px",
    paddingRight: "16px"
  },
  prevButton: {
    marginTop: "20px",
    marginLeft: "15px"
  },
  nextButton: {
    backgroundColor: "black",
    color: "white",
    marginTop: 0,
    margin: "25px",
    "&:hover": {
      background: "#606060"
    }
  },
  title: {
    fontSize: "1.5em",
    color: "black"
  },
  subTitle: {
    fontSize: "1em"
  },
  jumpButton: {
    fontSize: "1.5em"
  },
  comma: {
    marginRight: "0.5em"
  }
});

export class GuidedExperience extends Component {
  sectionMap = {
    patronType: "A1",
    serviceType: "A2",
    statusAndVitals: "A3",
    serviceHealthIssue: "A4"
  };

  render() {
    const { t, classes, selectedEligibility } = this.props;
    const eligibilityKeys = Object.keys(selectedEligibility);

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.container}>
          <Button
            size="medium"
            style={{ textTransform: "none" }}
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
            className={classnames(classes.prevButton)}
          >
            <ArrowBack />
            &nbsp; &nbsp; {t("back")}
          </Button>
          <div className={classnames(classes.root)}>
            <Grid container spacing={24} className={classnames(classes.box)}>
              <Grid item xs={12} md={3}>
                <Typography className={classnames(classes.title)}>
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
                        <span className={classes.comma}>
                          {i === 0 ? "" : ","}
                        </span>
                        <a
                          id={"jumpButton" + i}
                          className={classes.jumpButton}
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
                <Typography className={classnames(classes.subTitle)}>
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
              style={{ textTransform: "none" }}
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
              className={classnames(classes.nextButton)}
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
  classes: PropTypes.object.isRequired,
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

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(GuidedExperience)
);

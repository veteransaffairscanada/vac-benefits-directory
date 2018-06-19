import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "material-ui";
import { withStyles } from "material-ui/styles/index";
import MobileStepper from "material-ui/MobileStepper";
import Button from "material-ui/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Typography from "material-ui/Typography";
import classnames from "classnames";
import EditIcon from "@material-ui/icons/Edit";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#1A237E",
      main: "#E8EAF6",
      dark: "#0000FF", // '#002884',
      contrastText: "#fff"
    }
  }
});
const styles = theme => ({
  root: {
    border: "solid 1px grey",
    marginTop: "40px",
    backgroundColor: "white",
    margin: "15px"
  },
  box: {
    padding: "20px"
  },
  stepper: {
    flexGrow: 1,
    backgroundColor: "#3F51B5"
  },
  navButtons: {
    color: "white"
  },
  title: {
    fontSize: "2em",
    color: "black",
    marginBottom: "10px"
  },
  subTitle: {
    fontSize: "1em"
  },
  jumpButton: {
    textTransform: "none",
    paddingLeft: "20px",
    paddingRight: "15px",
    margin: theme.spacing.unit,
    backgroundColor: "#364150",
    color: "white",
    textAlign: "left"
  },
  edit: {
    marginLeft: "10px"
  }
});

export class GuidedExperience extends Component {
  render() {
    const { t, classes, selectedEligibility } = this.props;
    const sectionMap = {
      patronType: "A1",
      serviceType: "A2",
      statusAndVitals: "A3"
    };
    const eligibilityKeys = Object.keys(selectedEligibility);
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classnames(classes.root)}>
          <Grid container spacing={24} className={classnames(classes.box)}>
            <Grid item xs={6} md={4}>
              <Typography className={classnames(classes.title)}>
                {t("B3.Filter by eligibility")}
              </Typography>
            </Grid>
            <Grid item xs={6} md={8}>
              {eligibilityKeys.map((k, i) => {
                if (selectedEligibility[k] == "") {
                  return "";
                } else {
                  return (
                    <Button
                      disableRipple={true}
                      key={i}
                      variant="raised"
                      onClick={() => this.props.setSection(sectionMap[k])}
                      size="small"
                      className={classnames(classes.jumpButton)}
                    >
                      {t(selectedEligibility[k])}
                      <EditIcon className={classnames(classes.edit)} />
                    </Button>
                  );
                }
              })}
            </Grid>

            {this.props.id == "A4" ? (
              <Grid item xs={6} md={4}>
                <Typography className={classnames(classes.title)}>
                  {t("Filter by need")}
                </Typography>
              </Grid>
            ) : (
              ""
            )}

            <Grid item xs={12}>
              <Typography className={classnames(classes.subTitle)}>
                {this.props.subtitle}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              {this.props.children}
            </Grid>
          </Grid>

          <MobileStepper
            variant="progress"
            steps={5}
            position="static"
            activeStep={this.props.stepNumber}
            className={classnames(classes.stepper)}
            nextButton={
              <Button
                size="large"
                onClick={() => this.props.setSection(this.props.nextSection)}
                className={classnames(classes.navButtons)}
              >
                {t("next")}
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="large"
                onClick={() => this.props.setSection(this.props.prevSection)}
                disabled={this.props.stepNumber === 0}
                className={classnames(classes.navButtons)}
              >
                <KeyboardArrowLeft />
                {t("back")}
              </Button>
            }
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

GuidedExperience.propTypes = {
  id: PropTypes.string,
  classes: PropTypes.object,
  nextSection: PropTypes.string,
  prevSection: PropTypes.string,
  t: PropTypes.func,
  setSection: PropTypes.func,
  subtitle: PropTypes.string,
  stepNumber: PropTypes.number,
  children: PropTypes.object,
  selectedEligibility: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(GuidedExperience);

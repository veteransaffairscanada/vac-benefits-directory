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

const styles = () => ({
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
    flexGrow: 1
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
    margin: "5px",
    textTransform: "none"
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
      <div className={classnames(classes.root)}>
        <Grid container spacing={24} className={classnames(classes.box)}>
          <Grid item xs={6}>
            <Typography className={classnames(classes.title)}>
              {this.props.title}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {eligibilityKeys.map((k, i) => {
              if (selectedEligibility[k] == "") {
                return "";
              } else {
                return (
                  <Button
                    size="small"
                    variant="raised"
                    color="primary"
                    key={i}
                    className={classnames(classes.jumpButton)}
                    onClick={() => this.props.setSection(sectionMap[k])}
                  >
                    {t(selectedEligibility[k])}
                    <EditIcon className={classnames(classes.edit)} />
                  </Button>
                );
              }
            })}
          </Grid>

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
              size="small"
              onClick={() => this.props.setSection(this.props.nextSection)}
            >
              {t("next")}
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={() => this.props.setSection(this.props.prevSection)}
              disabled={this.props.stepNumber === 0}
            >
              <KeyboardArrowLeft />
              {t("back")}
            </Button>
          }
        />
      </div>
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
  title: PropTypes.string,
  subtitle: PropTypes.string,
  stepNumber: PropTypes.number,
  children: PropTypes.object,
  selectedEligibility: PropTypes.object
};

export default withStyles(styles)(GuidedExperience);

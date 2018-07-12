import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import EditIcon from "@material-ui/icons/Edit";
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
  }
});

const BlueBar = styled("div")`
  background-color: #303f9f;
  height: 5px;
  width: 100px;
  margin-bottom: 40px;
`;

const styles = theme => ({
  root: {
    border: "solid 1px grey",
    backgroundColor: "white",
    marginTop: "5px",
    margin: "15px"
  },
  box: {
    padding: "20px"
  },
  prevButton: {
    marginTop: "20px",
    marginLeft: "15px"
  },
  nextButton: {
    backgroundColor: "black",
    color: "white",
    marginTop: 0,
    margin: "25px"
  },
  title: {
    fontSize: "2em",
    color: "black"
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
        <div>
          <Button
            size="medium"
            style={{ textTransform: "none" }}
            onClick={() => this.props.setSection(this.props.prevSection)}
            disabled={this.props.stepNumber === 0}
            className={classnames(classes.prevButton)}
          >
            <ArrowBack />
            &nbsp; &nbsp; {t("back")}
          </Button>
          <div className={classnames(classes.root)}>
            <Grid container spacing={24} className={classnames(classes.box)}>
              <Grid item xs={12} md={4}>
                <Typography className={classnames(classes.title)}>
                  {t("B3.Filter by eligibility")}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
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
      statusAndVitals: reduxState.statusAndVitals
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
  benefitsDirectoryUrl: PropTypes.string
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(GuidedExperience)
);

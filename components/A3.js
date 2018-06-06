import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "material-ui";
import SelectButton from "../components/select_button";
import { withStyles } from "material-ui/styles/index";
import Typography from "material-ui/Typography";

const styles = () => ({
  subTitle: {
    fontSize: "20px",
    fontWeight: "100",
    paddingBottom: "25px"
  },
  title: {
    fontSize: "36px",
    padding: "15px 0"
  }
});

export class A3 extends Component {
  render() {
    const { t, classes } = this.props; // eslint-disable-line no-unused-vars

    const optionType = "statusAndVitals";
    const options = Array.from(
      new Set(this.props.eligibilityPaths.map(ep => ep[optionType]))
    ).filter(st => st !== "na");

    return (
      <div id={this.props.id} style={{ padding: 12 }}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography className={classes.title}>
              {t("B3.serviceStatus")}
            </Typography>
          </Grid>

          {options.map(option => (
            <Grid key={"pt" + option} item sm={4} xs={12}>
              <SelectButton
                id={option}
                text={t(option)}
                onClick={() => this.props.setUserProfile(optionType, option)}
                isDown={this.props.selectedEligibility[optionType] === option}
              />
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          justify="center"
          spacing={24}
          style={{ marginTop: "3em" }}
        >
          <Grid item sm={4} xs={12}>
            <SelectButton
              text={t("next")}
              onClick={() => this.props.setSection("BB")}
              isDown={false}
            />
          </Grid>
        </Grid>

        <Grid
          container
          justify="center"
          spacing={24}
          style={{ marginTop: "1em" }}
        >
          <Grid item sm={4} xs={12}>
            <p style={{ textAlign: "center", fontSize: "1em" }}>
              <a
                className="AllBenefits"
                href={"all-benefits?lng=" + t("current-language-code")}
                target="_blank"
              >
                {t("Show All Benefits")}
              </a>
            </p>
          </Grid>
        </Grid>
      </div>
    );
  }
}

A3.propTypes = {
  benefits: PropTypes.array,
  classes: PropTypes.object,
  clearFilters: PropTypes.func,
  clearNeeds: PropTypes.func,
  eligibilityPaths: PropTypes.array,
  examples: PropTypes.array,
  id: PropTypes.string,
  needs: PropTypes.array,
  selectedEligibility: PropTypes.object,
  selectedNeeds: PropTypes.object,
  setSelectedNeeds: PropTypes.func,
  setUserProfile: PropTypes.func,
  setSection: PropTypes.func,
  t: PropTypes.func,
  toggleSelectedEligibility: PropTypes.func
};

export default withStyles(styles)(A3);

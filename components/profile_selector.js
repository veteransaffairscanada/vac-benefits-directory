import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import classnames from "classnames";
import RadioSelector from "./radio_selector";

import "babel-polyfill/dist/polyfill";
import { Grid, Button } from "material-ui";

const styles = () => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  clearButton: {
    textAlign: "right",
    textDecoration: "underline"
  }
});

class ProfileSelector extends Component {
  render() {
    const { selectedEligibility, classes, t, eligibilityPaths } = this.props;
    let serviceTypes = Array.from(
      new Set(eligibilityPaths.map(ep => ep.serviceType))
    )
      .filter(st => st !== "na")
      .map(st => {
        return { id: st, name_en: st, name_fr: "FF " + st };
      });

    const patronTypes = Array.from(
      new Set(eligibilityPaths.map(ep => ep.patronType))
    )
      .filter(st => st !== "na")
      .map(st => {
        return { id: st, name_en: st, name_fr: "FF " + st };
      });

    let statusAndVitals = Array.from(
      new Set(eligibilityPaths.map(ep => ep.statusAndVitals))
    )
      .filter(st => st !== "na")
      .map(st => {
        return { id: st, name_en: st, name_fr: "FF " + st };
      });

    return (
      <Grid container spacing={8}>
        <Grid item xs={9}>
          <Typography variant="title">
            {t("B3.Filter by eligibility")}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            className={classnames(classes.clearButton)}
            id="ClearEligibilityFilters"
            variant="flat"
            size="small"
            onClick={() => {
              this.props.clearFilters();
            }}
          >
            {t("Clear")}
          </Button>
        </Grid>

        <Grid item xs={12} id="patronTypeFilter">
          <RadioSelector
            t={t}
            legend={t("B3.Benefits for")}
            filters={patronTypes}
            selectedFilters={selectedEligibility.patronType}
            setUserProfile={id => this.props.setUserProfile("patronType", id)}
            isDisabled={false}
          />
        </Grid>

        <Grid item xs={12} id="serviceTypeFilter">
          <RadioSelector
            t={t}
            legend={t("B3.ServiceType")}
            filters={serviceTypes}
            selectedFilters={selectedEligibility.serviceType}
            setUserProfile={id => this.props.setUserProfile("serviceType", id)}
            isDisabled={false}
          />
        </Grid>

        <Grid item xs={12} id="statusAndVitalsFilter">
          <RadioSelector
            t={t}
            legend={t("B3.serviceStatus")}
            filters={statusAndVitals}
            selectedFilters={selectedEligibility.statusAndVitals}
            setUserProfile={id =>
              this.props.setUserProfile("statusAndVitals", id)
            }
            isDisabled={false}
          />
        </Grid>
      </Grid>
    );
  }
}

ProfileSelector.propTypes = {
  classes: PropTypes.object,
  t: PropTypes.func,
  theme: PropTypes.object,
  clearFilters: PropTypes.func,
  setUserProfile: PropTypes.func,
  eligibilityPaths: PropTypes.array,
  selectedEligibility: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(ProfileSelector);

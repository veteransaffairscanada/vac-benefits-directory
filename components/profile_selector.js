import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import RadioSelector from "./radio_selector";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";

import "babel-polyfill/dist/polyfill";
import { Grid, Button } from "@material-ui/core";

const styles = () => ({
  root: {
    backgroundColor: "white"
  },
  summary: {
    opacity: "1 !important",
    userSelect: "inherit"
  },
  title: {
    color: "black !important"
  },
  clearButton: {
    textDecoration: "underline",
    textTransform: "unset"
  },
  gridItemButton: {
    textAlign: "center"
  }
});

class ProfileSelector extends Component {
  state = {
    open: false
  };

  toggleOpenState = () => {
    let newState = !this.state.open;
    this.setState({ open: newState });
  };

  render() {
    const {
      selectedEligibility,
      classes,
      t,
      eligibilityPaths,
      pageWidth
    } = this.props;

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
      <ExpansionPanel
        className={classnames(classes.root)}
        defaultExpanded
        disabled={pageWidth >= 600 ? true : false}
        expanded={pageWidth >= 600 ? true : this.state.open}
      >
        <ExpansionPanelSummary
          className={classnames(classes.summary)}
          expandIcon={pageWidth >= 600 ? "" : <ExpandMoreIcon />}
          onClick={pageWidth >= 600 ? foo => foo : () => this.toggleOpenState()}
        >
          <Typography variant="title" className={classnames(classes.title)}>
            {t("B3.Filter by eligibility")}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={8}>
            <Grid item xs={9} />
            <Grid item xs={12} id="patronTypeFilter">
              <RadioSelector
                t={t}
                legend={t("B3.Benefits for")}
                filters={patronTypes}
                selectedFilter={selectedEligibility.patronType}
                setUserProfile={id =>
                  this.props.setUserProfile("patronType", id)
                }
                store={this.props.store}
              />
            </Grid>

            {selectedEligibility.patronType &&
            selectedEligibility.patronType != "" &&
            selectedEligibility.patronType != "organization" ? (
              <Grid item xs={12} id="serviceTypeFilter">
                <RadioSelector
                  t={t}
                  legend={t("B3.ServiceType")}
                  filters={serviceTypes}
                  selectedFilter={selectedEligibility.serviceType}
                  setUserProfile={id =>
                    this.props.setUserProfile("serviceType", id)
                  }
                  store={this.props.store}
                />
              </Grid>
            ) : (
              ""
            )}

            {selectedEligibility.serviceType &&
            selectedEligibility.serviceType != "" &&
            selectedEligibility.patronType != "organization" &&
            !(
              selectedEligibility.patronType === "service-person" &&
              selectedEligibility.serviceType === "WSV (WWII or Korea)"
            ) ? (
              <Grid item xs={12} id="statusAndVitalsFilter">
                <RadioSelector
                  t={t}
                  legend={t("B3.serviceStatus")}
                  filters={statusAndVitals}
                  selectedFilter={selectedEligibility.statusAndVitals}
                  setUserProfile={id =>
                    this.props.setUserProfile("statusAndVitals", id)
                  }
                  store={this.props.store}
                />
              </Grid>
            ) : (
              ""
            )}

            <Grid item xs={12} className={classnames(classes.gridItemButton)}>
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
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    eligibilityPaths: reduxState.eligibilityPaths,
    selectedEligibility: {
      patronType: reduxState.patronType,
      serviceType: reduxState.serviceType,
      statusAndVitals: reduxState.statusAndVitals
    }
  };
};

ProfileSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  clearFilters: PropTypes.func.isRequired,
  setUserProfile: PropTypes.func.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  selectedEligibility: PropTypes.object.isRequired,
  pageWidth: PropTypes.number.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(ProfileSelector)
);

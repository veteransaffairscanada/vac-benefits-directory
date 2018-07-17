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

export class ProfileSelector extends Component {
  state = {
    open: false
  };

  toggleOpenState = () => {
    let newState = !this.state.open;
    this.setState({ open: newState });
  };

  clearFilters = () => {
    this.props.setPatronType("");
    this.props.setServiceType("");
    this.props.setStatusAndVitals("");
    this.props.setServiceHealthIssue("");
  };

  render() {
    const {
      patronType,
      serviceType,
      statusAndVitals,
      classes,
      t,
      pageWidth
    } = this.props;

    return (
      <ExpansionPanel
        className={classnames(classes.root)}
        defaultExpanded
        disabled={pageWidth >= 600}
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
                selectorType={"patronType"}
                store={this.props.store}
              />
            </Grid>

            {patronType &&
            patronType !== "" &&
            patronType !== "organization" ? (
              <Grid item xs={12} id="serviceTypeFilter">
                <RadioSelector
                  t={t}
                  legend={t("B3.ServiceType")}
                  selectorType={"serviceType"}
                  store={this.props.store}
                />
              </Grid>
            ) : (
              ""
            )}

            {serviceType &&
            serviceType !== "" &&
            patronType !== "organization" &&
            !(
              patronType === "service-person" &&
              serviceType === "WSV (WWII or Korea)"
            ) ? (
              <Grid item xs={12} id="statusAndVitalsFilter">
                <RadioSelector
                  t={t}
                  legend={t("B3.serviceStatus")}
                  selectorType={"statusAndVitals"}
                  store={this.props.store}
                />
              </Grid>
            ) : (
              ""
            )}

            {serviceType &&
            serviceType !== "" &&
            patronType !== "organization" &&
            (statusAndVitals !== "" ||
              (patronType === "service-person" &&
                serviceType === "WSV (WWII or Korea)")) ? (
              <Grid item xs={12} id="serviceHealthIssueFilter">
                <RadioSelector
                  t={t}
                  legend={t(
                    this.props.statusAndVitals === "deceased"
                      ? "health issue question deceased"
                      : "health issue question"
                  )}
                  selectorType={"serviceHealthIssue"}
                  options={["true", "false"]}
                  store={this.props.store}
                />
              </Grid>
            ) : (
              ""
            )}
            {this.props.patronType !== "" ? (
              <Grid item xs={12} className={classnames(classes.gridItemButton)}>
                <Button
                  className={classnames(classes.clearButton)}
                  id="ClearEligibilityFilters"
                  variant="flat"
                  size="small"
                  onClick={() => {
                    this.clearFilters();
                  }}
                >
                  {t("Clear")}
                </Button>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPatronType: patronType => {
      dispatch({ type: "SET_PATRON_TYPE", data: patronType });
    },
    setServiceType: serviceType => {
      dispatch({ type: "SET_SERVICE_TYPE", data: serviceType });
    },
    setStatusAndVitals: statusType => {
      dispatch({ type: "SET_STATUS_TYPE", data: statusType });
    },
    setServiceHealthIssue: serviceHealthIssue => {
      dispatch({ type: "SET_HEALTH_ISSUE", data: serviceHealthIssue });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    patronType: reduxState.patronType,
    serviceType: reduxState.serviceType,
    statusAndVitals: reduxState.statusAndVitals
  };
};

ProfileSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  setPatronType: PropTypes.func.isRequired,
  setServiceType: PropTypes.func.isRequired,
  setStatusAndVitals: PropTypes.func.isRequired,
  setServiceHealthIssue: PropTypes.func.isRequired,
  patronType: PropTypes.string.isRequired,
  serviceType: PropTypes.string.isRequired,
  statusAndVitals: PropTypes.string.isRequired,
  pageWidth: PropTypes.number.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, { withTheme: true })(ProfileSelector)
);

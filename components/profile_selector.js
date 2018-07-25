import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import RadioSelector from "./radio_selector";
import { connect } from "react-redux";
import "babel-polyfill/dist/polyfill";
import { Grid, Button } from "@material-ui/core";
import {
  showStatusAndVitals,
  showServiceHealthIssue,
  showServiceType
} from "../selectors/show_filters";

const styles = () => ({
  title: {
    color: "black !important"
  },
  clearButton: {
    textTransform: "unset",
    fontSize: "16px"
  }
});

export class ProfileSelector extends Component {
  clearFilters = () => {
    this.props.setPatronType("");
    this.props.setServiceType("");
    this.props.setStatusAndVitals("");
    this.props.setServiceHealthIssue("");
    this.props.setSelectedNeeds({});
  };

  countSelected = () => {
    let selectedProfileFilters = 0;
    if (this.props.selectedPatronType !== "") {
      selectedProfileFilters++;
    }
    if (this.props.selectedServiceType !== "") {
      selectedProfileFilters++;
    }
    if (this.props.selectedStatusAndVitals !== "") {
      selectedProfileFilters++;
    }
    if (this.props.selectedServiceHealthIssue !== "") {
      selectedProfileFilters++;
    }
    return (
      selectedProfileFilters + Object.values(this.props.selectedNeeds).length
    );
  };

  render() {
    const {
      classes,
      t,
      showServiceType,
      showStatusAndVitals,
      showServiceHealthIssue
    } = this.props;
    return (
      <div>
        {JSON.stringify(this.props.selectedNeeds) !== "{}" ||
        this.props.selectedPatronType !== "" ? (
          <Grid item sm={12} className={classnames(classes.gridItemButton)}>
            <Button
              className={classnames(classes.clearButton)}
              id="ClearFilters"
              variant="text"
              size="small"
              color="primary"
              onClick={() => {
                this.clearFilters();
              }}
            >
              {t("reset filters")} {"(" + this.countSelected() + ")"}
            </Button>
          </Grid>
        ) : (
          ""
        )}
        {t("B3.Filter by eligibility")}
        <Grid container spacing={8}>
          <Grid item xs={12} id="patronTypeFilter">
            <RadioSelector
              t={t}
              legend={t("B3.Benefits for")}
              selectorType={"patronType"}
              store={this.props.store}
            />
          </Grid>

          {showServiceType ? (
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

          {showStatusAndVitals ? (
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

          {showServiceHealthIssue ? (
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
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps1 = dispatch => {
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
    },
    setSelectedNeeds: needsObject => {
      dispatch({ type: "SET_SELECTED_NEEDS", data: needsObject });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    statusAndVitals: reduxState.statusAndVitals,
    showStatusAndVitals: showStatusAndVitals(reduxState),
    showServiceHealthIssue: showServiceHealthIssue(reduxState),
    showServiceType: showServiceType(reduxState),
    selectedNeeds: reduxState.selectedNeeds,
    selectedPatronType: reduxState.patronType,
    selectedServiceType: reduxState.serviceType,
    selectedStatusAndVitals: reduxState.statusAndVitals,
    selectedServiceHealthIssue: reduxState.serviceHealthIssue
  };
};

ProfileSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  statusAndVitals: PropTypes.string.isRequired,
  store: PropTypes.object,
  showStatusAndVitals: PropTypes.bool.isRequired,
  showServiceHealthIssue: PropTypes.bool.isRequired,
  showServiceType: PropTypes.bool.isRequired,
  setPatronType: PropTypes.func.isRequired,
  setServiceType: PropTypes.func.isRequired,
  setStatusAndVitals: PropTypes.func.isRequired,
  setServiceHealthIssue: PropTypes.func.isRequired,
  setSelectedNeeds: PropTypes.func.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  selectedPatronType: PropTypes.string.isRequired,
  selectedServiceType: PropTypes.string.isRequired,
  selectedStatusAndVitals: PropTypes.string.isRequired,
  selectedServiceHealthIssue: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps1
)(withStyles(styles, { withTheme: true })(ProfileSelector));

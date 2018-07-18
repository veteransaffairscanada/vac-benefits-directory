import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { FormControl, FormControlLabel, FormLabel } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { connect } from "react-redux";
import { logEvent } from "../utils/analytics";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit
  },
  formLabel: {
    lineHeight: "1.5em",
    marginBottom: "10px"
  }
});

export class RadioSelector extends React.Component {
  setters = {
    patronType: this.props.setPatronType,
    serviceType: this.props.setServiceType,
    statusAndVitals: this.props.setStatusAndVitals,
    serviceHealthIssue: this.props.setServiceHealthIssue
  };

  isDisabled = (filter_id, patronType, serviceType) => {
    if (serviceType == "WSV (WWII or Korea)" && filter_id == "stillServing") {
      return true;
    }
    if (patronType == "service-person" && filter_id == "deceased") {
      return true;
    }
    return false;
  };

  setUserProfile = (criteria, id) => {
    logEvent("FilterClick", criteria, id);
    switch (criteria) {
      case "patronType":
        this.props.setPatronType(id);
        if (id === "organization") {
          this.props.setServiceType("");
          this.props.setStatusAndVitals("");
          this.props.setServiceHealthIssue("");
        }
        if (
          id === "service-person" &&
          this.props.selectedStatusAndVitals === "deceased"
        ) {
          this.props.setStatusAndVitals("");
        }
        if (
          id === "service-person" &&
          this.props.selectedServiceType === "WSV (WWII or Korea)" &&
          this.props.selectedStatusAndVitals !== ""
        ) {
          this.props.setStatusAndVitals("");
        }
        break;
      case "serviceType":
        this.props.setServiceType(id);
        if (
          id === "WSV (WWII or Korea)" &&
          this.props.selectedStatusAndVitals === "stillServing"
        ) {
          this.props.setStatusAndVitals("");
        }
        if (
          id === "WSV (WWII or Korea)" &&
          this.props.selectedPatronType === "service-person" &&
          this.props.selectedStatusAndVitals !== ""
        ) {
          this.props.setStatusAndVitals("");
        }
        break;
      case "statusAndVitals":
        this.props.setStatusAndVitals(id);
        break;
      case "serviceHealthIssue":
        this.props.setServiceHealthIssue(id);
        break;
      default:
        return true;
    }
  };

  handleSelect = event => {
    this.setUserProfile(this.props.selectorType, event.target.value);
  };

  render() {
    const allFilterIds = this.props.options
      ? this.props.options
      : Array.from(
          new Set(
            this.props.eligibilityPaths.map(ep => ep[this.props.selectorType])
          )
        ).filter(st => st !== "na");

    const { classes, t, selectorType } = this.props;
    const selected = {
      patronType: this.props.selectedPatronType,
      serviceType: this.props.selectedServiceType,
      statusAndVitals: this.props.selectedStatusAndVitals,
      serviceHealthIssue: this.props.selectedServiceHealthIssue
    };

    if (Object.values(allFilterIds).length != 0) {
      return (
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.formLabel}>
            {this.props.legend}
          </FormLabel>
          <RadioGroup
            aria-label={this.props.legend}
            value={selected[selectorType]}
            onChange={this.handleSelect}
          >
            {allFilterIds.map(filter_id => {
              return (
                <FormControlLabel
                  key={filter_id}
                  value={filter_id}
                  control={<Radio />}
                  label={t(filter_id)}
                  disabled={this.isDisabled(
                    filter_id,
                    this.props.selectedPatronType,
                    this.props.selectedServiceType
                  )}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      );
    } else {
      return null;
    }
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
    setServiceHealthIssue: healthIssueType => {
      dispatch({ type: "SET_HEALTH_ISSUE", data: healthIssueType });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    selectedPatronType: reduxState.patronType,
    selectedServiceType: reduxState.serviceType,
    selectedStatusAndVitals: reduxState.statusAndVitals,
    selectedServiceHealthIssue: reduxState.serviceHealthIssue,
    eligibilityPaths: reduxState.eligibilityPaths
  };
};

RadioSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  legend: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  selectedPatronType: PropTypes.string.isRequired,
  selectedServiceType: PropTypes.string.isRequired,
  selectedStatusAndVitals: PropTypes.string.isRequired,
  selectedServiceHealthIssue: PropTypes.string.isRequired,
  setPatronType: PropTypes.func.isRequired,
  setServiceType: PropTypes.func.isRequired,
  setStatusAndVitals: PropTypes.func.isRequired,
  setServiceHealthIssue: PropTypes.func.isRequired,
  selectorType: PropTypes.string.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  options: PropTypes.array,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RadioSelector));

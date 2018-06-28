import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { FormControl, FormControlLabel, FormLabel } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { connect } from "react-redux";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit
  }
});

export class RadioSelector extends React.Component {
  handleSelect = event => {
    // this.props.setUserProfile(event.target.value);
    this.props[this.props.criteria](event.target.value);
  };

  isDisabled = (id, serviceType, patronType) => {
    if (serviceType == "WSV (WWII or Korea)" && id == "stillServing") {
      return true;
    }
    if (patronType == "service-person" && id == "deceased") {
      return true;
    }
    return false;
  };

  render() {
    const { classes, t, criteria } = this.props;
    console.log(this.props["x" + criteria]);
    if (Object.values(this.props.filters).length != 0) {
      return (
        <FormControl className={classes.formControl}>
          <FormLabel>{this.props.legend}</FormLabel>
          <RadioGroup
            aria-label={this.props.legend}
            value={this.props["x" + criteria][criteria]}
            onChange={this.handleSelect}
          >
            {this.props.filters.map(x => {
              return (
                <FormControlLabel
                  key={x.id}
                  value={x.id}
                  control={<Radio />}
                  label={t(x.name_en)}
                  disabled={this.isDisabled(
                    x.id,
                    this.props.xserviceType,
                    this.props.xpatronType
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
    patronType: patronType => {
      dispatch({ type: "SET_PATRON_TYPE", data: patronType });
    },
    serviceType: serviceType => {
      dispatch({ type: "SET_SERVICE_TYPE", data: serviceType });
    },
    statusType: statusType => {
      dispatch({ type: "SET_STATUS_TYPE", data: statusType });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    xpatronType: reduxState.patronType,
    xserviceType: reduxState.serviceType,
    xstatusAndVitals: reduxState.statusAndVitals
  };
};

RadioSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  legend: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
  selectedFilter: PropTypes.string,
  setUserProfile: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  criteria: PropTypes.string.isRequired,
  setPatronType: PropTypes.func.isRequired,
  setServiceType: PropTypes.func.isRequired,
  setStatusType: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(RadioSelector)
);

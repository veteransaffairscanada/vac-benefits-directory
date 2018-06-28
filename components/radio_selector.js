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
    this.props.setUserProfile(event.target.value);
  };

  isDisabled = (id, selectedEligibility) => {
    if (
      selectedEligibility.serviceType == "WSV (WWII or Korea)" &&
      id == "stillServing"
    ) {
      return true;
    }
    if (
      selectedEligibility.patronType == "service-person" &&
      id == "deceased"
    ) {
      return true;
    }
    return false;
  };
  render() {
    const { classes, t } = this.props;
    if (Object.values(this.props.filters).length != 0) {
      return (
        <FormControl className={classes.formControl}>
          <FormLabel>{this.props.legend}</FormLabel>
          <RadioGroup
            aria-label={this.props.legend}
            value={this.props.selectedFilter}
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
                    this.props.selectedEligibility
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

const mapStateToProps = reduxState => {
  return {
    selectedEligibility: {
      patronType: reduxState.patronType,
      serviceType: reduxState.serviceType,
      statusAndVitals: reduxState.statusAndVitals
    }
  };
};

RadioSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  legend: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
  selectedEligibility: PropTypes.object.isRequired,
  selectedFilter: PropTypes.string,
  setUserProfile: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(RadioSelector));

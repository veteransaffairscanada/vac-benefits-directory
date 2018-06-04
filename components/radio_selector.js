import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { FormControl, FormControlLabel, FormLabel } from "material-ui/Form";
import Radio from "material-ui/Radio";
import RadioGroup from "material-ui/Radio/RadioGroup";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit
  }
});
class RadioSelector extends React.Component {
  handleSelect = event => {
    this.props.setUserProfile(event.target.value);
  };

  render() {
    const { classes, t } = this.props;

    return (
      <FormControl required className={classes.formControl}>
        <FormLabel>{this.props.legend}</FormLabel>
        <RadioGroup
          aria-label={this.props.legend}
          value={this.props.selectedFilters}
          onChange={this.handleSelect}
        >
          {this.props.filters.map(x => {
            return (
              <FormControlLabel
                key={x.id}
                value={x.id}
                control={<Radio />}
                label={t(x.name_en)}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    );
  }
}
RadioSelector.propTypes = {
  classes: PropTypes.object,
  disabledString: PropTypes.string,
  isDisabled: PropTypes.bool,
  legend: PropTypes.string,
  filters: PropTypes.array,
  selectedFilters: PropTypes.string,
  setUserProfile: PropTypes.func,
  t: PropTypes.func
};

export default withStyles(styles)(RadioSelector);

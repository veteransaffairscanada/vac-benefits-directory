import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl, FormHelperText } from "material-ui/Form";
import Select from "material-ui/Select";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class DropDownSelector extends React.Component {
  handleSelect = event => {
    this.props.setUserProfile(event.target.value);
  };

  render() {
    const { classes, t } = this.props;
    let disabledStatus = { disabled: this.props.isDisabled };
    let selectedFilter =
      Object.keys(this.props.selectedFilters).length === 0
        ? "None"
        : Object.keys(this.props.selectedFilters)[0];

    return (
      <FormControl className={classes.formControl} {...disabledStatus}>
        <InputLabel htmlFor="age-simple">{t(this.props.legend)}</InputLabel>
        <Select
          value={selectedFilter}
          onChange={this.handleSelect}
          inputProps={{
            name: "age",
            id: "age-simple"
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.props.filters.map(pt => (
            <MenuItem key={pt.id} value={pt.id}>
              {t(pt.id)}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {disabledStatus.disabled ? this.props.disabledString : ""}{" "}
        </FormHelperText>
      </FormControl>
    );
  }
}

DropDownSelector.propTypes = {
  classes: PropTypes.object,
  disabledString: PropTypes.string,
  isDisabled: PropTypes.bool,
  legend: PropTypes.string,
  filters: PropTypes.array,
  selectedFilters: PropTypes.object,
  setUserProfile: PropTypes.func,
  t: PropTypes.func
};

export default withStyles(styles)(DropDownSelector);

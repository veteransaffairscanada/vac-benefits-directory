import React from "react";
import { withStyles } from "material-ui/styles";
import { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
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

type Props = {
  t: mixed,
  id: string,
  legend: string,
  filters: mixed,
  selectedFilters: mixed,
  setUserProfile: mixed,
  classes: mixed
};

class DropDownSelector extends React.Component<Props> {
  state = {
    age: "",
    name: "hai"
  };

  handleSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.setUserProfile(event.target.value);
  };

  render() {
    const { classes, t } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">{t(this.props.legend)}</InputLabel>
        <Select
          value={this.state.age}
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
      </FormControl>
    );
  }
}

export default withStyles(styles)(DropDownSelector);

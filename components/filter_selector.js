import React, { Component } from "react";
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel
} from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";

type Props = {
  t: mixed,
  legend: string,
  filters: mixed,
  selectedFilters: mixed,
  handleChange: mixed
};

class FilterSelector extends Component<Props> {
  render() {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{this.props.legend}</FormLabel>
        <FormGroup>
          {this.props.filters.map(pt => (
            <FormControlLabel
              key={pt.id}
              control={
                <Checkbox
                  checked={this.props.selectedFilters.indexOf(pt.id) > -1}
                  onChange={this.props.handleChange(pt.id)}
                  value={pt.id}
                />
              }
              label={pt.name_en}
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  }
}

export default FilterSelector;

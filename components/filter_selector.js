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
  id: string,
  legend: string,
  filters: mixed,
  selectedFilters: mixed,
  handleChange: mixed
};

class FilterSelector extends Component<Props> {
  render() {
    const { t } = this.props;
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{t(this.props.legend)}</FormLabel>
        <FormGroup>
          {this.props.filters.map(pt => (
            <FormControlLabel
              id={pt.id}
              key={pt.id}
              control={
                <Checkbox
                  checked={this.props.selectedFilters.hasOwnProperty(pt.id)}
                  onChange={this.props.handleChange(pt.id)}
                  value={pt.id}
                />
              }
              label={
                t(pt.id)
                // t("current-language-code") === "en" ? pt.name_en : pt.name_fr
              }
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  }
}

export default FilterSelector;

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Input, { InputLabel } from "material-ui/Input";
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

type Props = {
  t: mixed,
  id: string,
  legend: string,
  filters: mixed,
  selectedFilters: mixed,
  handleChange: mixed
};

class DropDownSelector extends React.Component<Props> {
  state = {
    age: "",
    name: "hai"
  };

  handleSelect = event => {
    console.log("in dropdown", event.target.name, event.target.value);

    this.setState({ [event.target.name]: event.target.value });

    this.props.handleChange(event.target.value);
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

//
// import React, { Component } from "react";
// import {
//   FormLabel,
//   FormControl,
//   FormGroup,
//   FormControlLabel
// } from "material-ui/Form";
// import Checkbox from "material-ui/Checkbox";
//
// type Props = {
//   t: mixed,
//   id: string,
//   legend: string,
//   filters: mixed,
//   selectedFilters: mixed,
//   handleChange: mixed
// };
//
// const checkboxStyle = {
//   margin: "-5px 0"
// };
//
// const fieldStyle = {
//   margin: "5px 0 15px 0"
// };
//
// const labelStyle = {
//   margin: "5px 0 10px 0"
// };
//
// class FilterSelector extends Component<Props> {
//   render() {
//     const { t } = this.props;
//     return (
//       <FormControl component="fieldset" style={fieldStyle}>
//         <FormLabel component="legend" style={labelStyle}>
//           {t(this.props.legend)}
//         </FormLabel>
//         <FormGroup>
//           {this.props.filters.map(pt => (
//             <FormControlLabel
//               id={pt.id}
//               key={pt.id}
//               style={checkboxStyle}
//               control={
//                 <Checkbox
//                   checked={this.props.selectedFilters.hasOwnProperty(pt.id)}
//                   onChange={this.props.handleChange(pt.id)}
//                   value={pt.id}
//                 />
//               }
//               label={
//                 t(pt.id)
//                 // t("current-language-code") === "en" ? pt.name_en : pt.name_fr
//               }
//             />
//           ))}
//         </FormGroup>
//       </FormControl>
//     );
//   }
// }

export default withStyles(styles)(DropDownSelector);

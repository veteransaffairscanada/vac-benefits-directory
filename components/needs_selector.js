import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import Checkbox from "material-ui/Checkbox";
import Chip from "material-ui/Chip";
import "babel-polyfill/dist/polyfill";

const chipStyle = {
  borderRadius: "8px",
  fontSize: "16px"
};

const layoutStyle = {
  fontSize: "16px"
};

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "10px"
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

type Props = {
  t: mixed,
  needs: mixed,
  handleChange: mixed
};

class NeedsSelector extends Component<Props> {
  state = {
    name: []
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
    this.props.handleChange(event.target.value);
  };

  render() {
    const { classes, theme, t } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel style={layoutStyle} htmlFor="select-multiple-chip">
            {t("B3.What do you need help with?")}
          </InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(needId => (
                  <Chip
                    key={needId}
                    label={
                      t("current-language-code") === "en"
                        ? this.props.needs.find(need => {
                            return need.id === needId;
                          }).nameEn
                        : this.props.needs.find(need => {
                            return need.id === needId;
                          }).nameFr
                    }
                    className={classes.chip}
                    style={chipStyle}
                  />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {this.props.needs.map(need => (
              <MenuItem
                className="needOption"
                key={need.id}
                value={need.id}
                style={{
                  fontWeight:
                    this.state.name.indexOf(need.id) === -1
                      ? theme.typography.fontWeightRegular
                      : theme.typography.fontWeightMedium
                }}
              >
                <Checkbox checked={this.state.name.indexOf(need.id) > -1} />
                {t("current-language-code") === "en"
                  ? need.nameEn
                  : need.nameFr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

NeedsSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(NeedsSelector);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import Chip from "material-ui/Chip";
import "babel-polyfill/dist/polyfill";
import { Button } from "material-ui";

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
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  },
  chipSelected: {
    margin: theme.spacing.unit,
    backgroundColor: "#364150",
    color: "white"
  }
  // root: {
  //   display: "flex",
  //   flexWrap: "wrap",
  //   marginBottom: "10px"
  // },
  // formControl: {
  //   margin: theme.spacing.unit,
  //   width: "100%"
  // },
  // chips: {
  //   display: "flex",
  //   flexWrap: "wrap"
  // },
  // chip: {
  //   margin: theme.spacing.unit / 4
  // }
});

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250
//     }
//   }
// };

class NeedsSelector extends Component {
  handleClick = id => {
    console.log("NeedsSelector clicked", id);
    let newSelectedNeeds = this.props.selectedNeeds;
    if (newSelectedNeeds.hasOwnProperty(id)) {
      delete newSelectedNeeds[id];
    } else {
      newSelectedNeeds[id] = id;
    }
    this.props.handleChange(Object.keys(newSelectedNeeds));
  };

  render() {
    const { needs, classes, t } = this.props;
    const selectedNeeds = Object.keys(this.props.selectedNeeds);
    return (
      <div>
        <div>{t("B3.What do you need help with?")}</div>
        <div className={classes.root}>
          {needs.map(need => (
            <Chip
              key={need.id}
              label={
                t("current-language-code") === "en" ? need.nameEn : need.nameFr
              }
              onClick={() => this.handleClick(need.id)}
              value={need.id}
              className={
                selectedNeeds.indexOf(need.id) === -1
                  ? classes.chip
                  : classes.chipSelected
              }
            />
          ))}
        </div>
      </div>
    );
  }
}

NeedsSelector.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func,
  needs: PropTypes.array,
  selectedNeeds: PropTypes.object,
  t: PropTypes.func,
  theme: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(NeedsSelector);

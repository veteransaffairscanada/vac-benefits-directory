import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

import "babel-polyfill/dist/polyfill";
import { Button } from "material-ui";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  need: {
    margin: theme.spacing.unit,
    backgroundColor: "#F5F5F5"
  },
  needSelected: {
    margin: theme.spacing.unit,
    backgroundColor: "#364150",
    color: "white"
  }
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
        <Typography variant="title">
          {t("Filter by need")}
          <br />
        </Typography>
        <Typography variant="subheading">
          {t("Select all that apply")}
          <br />
          <br />
        </Typography>
        <div className={classes.root}>
          {needs.map(need => (
            <Button
              disableRipple={true}
              key={need.id}
              variant="raised"
              onClick={() => this.handleClick(need.id)}
              value={need.id}
              className={
                selectedNeeds.indexOf(need.id) === -1
                  ? classes.need
                  : classes.needSelected
              }
            >
              {t("current-language-code") === "en" ? need.nameEn : need.nameFr}
            </Button>
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

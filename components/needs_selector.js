import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import classnames from "classnames";

import "babel-polyfill/dist/polyfill";
import { Grid, Button } from "material-ui";

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
  },
  clearButton: {
    textAlign: "right",
    textDecoration: "underline"
  }
});

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
      <Grid container spacing={8}>
        <Grid item xs={9}>
          <Typography variant="title">{t("Filter by need")}</Typography>
          <Typography variant="subheading">
            {t("Select all that apply")}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            className={classnames(classes.clearButton)}
            id="ClearFilters"
            variant="flat"
            size="small"
            onClick={() => {
              this.props.clearNeeds();
            }}
          >
            {t("Clear")}
          </Button>
        </Grid>
        <Grid id="needs_buttons" item xs={12} className={classes.root}>
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
        </Grid>
      </Grid>
    );
  }
}

NeedsSelector.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func,
  needs: PropTypes.array,
  selectedNeeds: PropTypes.object,
  t: PropTypes.func,
  theme: PropTypes.object,
  clearNeeds: PropTypes.func
};

export default withStyles(styles, { withTheme: true })(NeedsSelector);

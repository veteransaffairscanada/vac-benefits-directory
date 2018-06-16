import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "material-ui";
import { withStyles } from "material-ui/styles/index";

const styles = theme => ({
  need: {
    margin: theme.spacing.unit,
    backgroundColor: "#F5F5F5",
    textTransform: "none",
    textAlign: "left"
  },
  needSelected: {
    margin: theme.spacing.unit,
    backgroundColor: "#364150",
    color: "white",
    textTransform: "none",
    textAlign: "left"
  }
});

export class GuidedExperienceNeeds extends Component {
  handleClick = id => {
    let newSelectedNeeds = this.props.selectedNeeds;
    if (newSelectedNeeds.hasOwnProperty(id)) {
      delete newSelectedNeeds[id];
    } else {
      newSelectedNeeds[id] = id;
    }
    this.props.setSelectedNeeds(Object.keys(newSelectedNeeds));
  };

  render() {
    const { t, classes } = this.props; // eslint-disable-line no-unused-vars

    return (
      <div style={{ padding: 12 }}>
        <Grid container spacing={24}>
          {this.props.needs.map(need => (
            <Button
              disableRipple={true}
              key={need.id}
              variant="raised"
              onClick={() => this.handleClick(need.id)}
              value={need.id}
              isdownstatus={
                this.props.selectedNeeds.hasOwnProperty(need.id) ? "down" : "up"
              }
              className={
                this.props.selectedNeeds.hasOwnProperty(need.id)
                  ? classes.needSelected
                  : classes.need
              }
            >
              {t("current-language-code") === "en" ? need.nameEn : need.nameFr}
            </Button>
          ))}
        </Grid>
      </div>
    );
  }
}

GuidedExperienceNeeds.propTypes = {
  classes: PropTypes.object,
  needs: PropTypes.array,
  selectedNeeds: PropTypes.object,
  setSelectedNeeds: PropTypes.func,
  t: PropTypes.func
};

export default withStyles(styles)(GuidedExperienceNeeds);

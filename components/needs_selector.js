import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "babel-polyfill/dist/polyfill";
import { Grid, Button } from "@material-ui/core";

const styles = theme => ({
  root: {
    backgroundColor: "white"
  },
  summary: {
    opacity: "1 !important",
    userSelect: "inherit"
  },
  title: {
    color: "black !important"
  },
  needsButtons: {
    display: "flex",
    flexWrap: "wrap"
  },
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
  },
  clearButton: {
    textDecoration: "underline",
    textTransform: "unset"
  },
  gridItemButton: {
    textAlign: "center"
  }
});

class NeedsSelector extends Component {
  state = {
    open: false
  };

  toggleOpenState = () => {
    let newState = !this.state.open;
    this.setState({ open: newState });
  };

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
    const { needs, classes, t, pageWidth } = this.props;
    const selectedNeeds = Object.keys(this.props.selectedNeeds);
    return (
      <ExpansionPanel
        className={classnames(classes.root)}
        defaultExpanded
        disabled={pageWidth >= 600 ? true : false}
        expanded={pageWidth >= 600 ? true : this.state.open}
      >
        <ExpansionPanelSummary
          className={classnames(classes.summary)}
          expandIcon={pageWidth >= 600 ? "" : <ExpandMoreIcon />}
          onClick={pageWidth >= 600 ? foo => foo : () => this.toggleOpenState()}
        >
          <Typography variant="title" className={classnames(classes.title)}>
            {t("Filter by need")}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={8}>
            <Grid item xs={9}>
              <Typography variant="subheading">
                {t("Select all that apply")}
              </Typography>
            </Grid>
            <Grid
              id="needs_buttons"
              item
              xs={12}
              className={classes.needsButtons}
            >
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
                  {t("current-language-code") === "en"
                    ? need.nameEn
                    : need.nameFr}
                </Button>
              ))}
            </Grid>
            <Grid item xs={12} className={classnames(classes.gridItemButton)}>
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
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

NeedsSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  needs: PropTypes.array.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  clearNeeds: PropTypes.func.isRequired,
  pageWidth: PropTypes.number.isRequired
};

export default withStyles(styles, { withTheme: true })(NeedsSelector);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";

import "babel-polyfill/dist/polyfill";
import { Grid, Button } from "@material-ui/core";
import { logEvent } from "../utils/analytics";

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

export class NeedsSelector extends Component {
  state = {
    open: false
  };

  toggleOpenState = () => {
    let newState = !this.state.open;
    this.setState({ open: newState });
  };

  handleClick = id => {
    let newSelectedNeeds = JSON.parse(JSON.stringify(this.props.selectedNeeds));
    if (newSelectedNeeds.hasOwnProperty(id)) {
      delete newSelectedNeeds[id];
    } else {
      logEvent("FilterClick", "need", id);
      newSelectedNeeds[id] = id;
    }
    window.scrollTo(0, 0);
    this.props.setSelectedNeeds(newSelectedNeeds);
  };

  clearNeeds = () => {
    this.props.setSelectedNeeds({});
  };

  render() {
    const { needs, classes, t, pageWidth } = this.props;
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
                    this.props.selectedNeeds[need.id]
                      ? classes.needSelected
                      : classes.need
                  }
                >
                  {t("current-language-code") === "en"
                    ? need.nameEn
                    : need.nameFr}
                </Button>
              ))}
            </Grid>
            {JSON.stringify(this.props.selectedNeeds) !== "{}" ? (
              <Grid item xs={12} className={classnames(classes.gridItemButton)}>
                <Button
                  className={classnames(classes.clearButton)}
                  id="ClearFilters"
                  variant="flat"
                  size="small"
                  onClick={() => {
                    this.clearNeeds();
                  }}
                >
                  {t("Clear")}
                </Button>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedNeeds: needsObject => {
      dispatch({ type: "SET_SELECTED_NEEDS", data: needsObject });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    needs: reduxState.needs,
    selectedNeeds: reduxState.selectedNeeds
  };
};

NeedsSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  needs: PropTypes.array.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  setSelectedNeeds: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  pageWidth: PropTypes.number.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, { withTheme: true })(NeedsSelector)
);

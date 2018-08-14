import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { logEvent } from "../utils/analytics";

const styles = theme => ({
  main: {
    marginRight: 1.5 * theme.spacing.unit,
    marginBottom: 1.5 * theme.spacing.unit,
    textTransform: "none",
    textAlign: "left",
    borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "5px",
    "&:focus": {
      borderWidth: "4px"
    },
    "&:hover": {
      opacity: "0.5"
    }
  }
});

export class NeedButton extends Component {
  handleClick = id => {
    let newSelectedNeeds = JSON.parse(JSON.stringify(this.props.selectedNeeds));
    if (newSelectedNeeds.hasOwnProperty(id)) {
      delete newSelectedNeeds[id];
    } else {
      logEvent("FilterClick", "need", id);
      newSelectedNeeds[id] = id;
    }
    if (window && this.props.pageWidth >= 600) {
      window.scrollTo(0, 0);
    }
    this.props.setSelectedNeeds(newSelectedNeeds);
  };

  render() {
    const { t, need, classes } = this.props;
    return (
      <Button
        size="small"
        disableRipple={true}
        onClick={() => this.handleClick(need.id)}
        value={need.id}
        className={classes.main}
        style={{
          borderColor: need.colour,
          backgroundColor: this.props.selectedNeeds[need.id]
            ? need.colour
            : "white"
        }}
      >
        {t("current-language-code") === "en" ? need.nameEn : need.nameFr}
      </Button>
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

NeedButton.propTypes = {
  classes: PropTypes.object.isRequired,
  need: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  setSelectedNeeds: PropTypes.func.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  pageWidth: PropTypes.number.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(NeedButton));

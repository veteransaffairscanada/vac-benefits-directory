import React, { Component } from "react";
import PropTypes from "prop-types";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ClearIcon from "@material-ui/icons/Clear";
import NeedsSelector from "./needs_selector";
import ProfileSelector from "./profile_selector";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  root: {
    backgroundColor: "white"
  },
  summary: {
    opacity: "1 !important",
    userSelect: "inherit"
  },
  profileSelector: {
    borderBottom: "1px solid black",
    paddingBottom: "15px",
    marginBottom: "30px"
  },
  clearButton: {
    textDecoration: "underline",
    textTransform: "unset",
    fontSize: "16px"
  },
  gridItemButton: {
    textAlign: "center"
  }
});

export class ProfileNeedsSelector extends Component {
  state = {
    open: false
  };

  clearFilters = () => {
    this.props.setPatronType("");
    this.props.setServiceType("");
    this.props.setStatusAndVitals("");
    this.props.setServiceHealthIssue("");
    this.props.setSelectedNeeds({});
  };

  toggleOpenState = () => {
    let newState = !this.state.open;
    this.setState({ open: newState });
  };

  render() {
    const { t, pageWidth, store, classes } = this.props;
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
          <Typography variant="title">{t("filters")}</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Grid container>
            <Grid item sm={12} className={classnames(classes.profileSelector)}>
              <ProfileSelector t={t} store={store} />
            </Grid>
            <Grid item sm={12}>
              <NeedsSelector t={t} pageWidth={pageWidth} store={store} />
            </Grid>
            {JSON.stringify(this.props.selectedNeeds) !== "{}" ||
            this.props.patronType !== "" ? (
              <Grid item sm={12} className={classnames(classes.gridItemButton)}>
                <Button
                  className={classnames(classes.clearButton)}
                  id="ClearFilters"
                  variant="flat"
                  size="small"
                  onClick={() => {
                    this.clearFilters();
                  }}
                >
                  {t("reset filters")}
                  <ClearIcon />
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

const mapDispatchToProps1 = dispatch => {
  return {
    setPatronType: patronType => {
      dispatch({ type: "SET_PATRON_TYPE", data: patronType });
    },
    setServiceType: serviceType => {
      dispatch({ type: "SET_SERVICE_TYPE", data: serviceType });
    },
    setStatusAndVitals: statusType => {
      dispatch({ type: "SET_STATUS_TYPE", data: statusType });
    },
    setServiceHealthIssue: serviceHealthIssue => {
      dispatch({ type: "SET_HEALTH_ISSUE", data: serviceHealthIssue });
    },
    setSelectedNeeds: needsObject => {
      dispatch({ type: "SET_SELECTED_NEEDS", data: needsObject });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    selectedNeeds: reduxState.selectedNeeds,
    patronType: reduxState.patronType,
    pageWidth: reduxState.pageWidth
  };
};

ProfileNeedsSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  patronType: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  pageWidth: PropTypes.number.isRequired,
  setPatronType: PropTypes.func.isRequired,
  setServiceType: PropTypes.func.isRequired,
  setStatusAndVitals: PropTypes.func.isRequired,
  setServiceHealthIssue: PropTypes.func.isRequired,
  setSelectedNeeds: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps1
)(withStyles(styles)(ProfileNeedsSelector));

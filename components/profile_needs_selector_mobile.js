import React, { Component } from "react";
import PropTypes from "prop-types";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NeedsSelector from "./needs_selector";
import ProfileSelector from "./profile_selector";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { globalTheme } from "../theme";
import { css } from "react-emotion";

const root = css`
  background-color: #f5f5f5 !important;
  @media only screen and (min-width: ${globalTheme.max.xs}) {
    display: none;
  }
`;
const summary = css`
  opacity: 1 !important;
  user-select: inherit;
`;
const profileSelector = css`
  border-bottom: 1px solid black;
  padding-bottom: 15px;
  margin-bottom: 30px !important;
`;
const clearButton = css`
  text-decoration: underline !important;
  text-transform: unset !important;
  font-size: 16px !important;
`;
const filterTitle = css`
  padding-right: 0px;
`;

export class ProfileNeedsSelectorMobile extends Component {
  state = {
    open: false
  };

  countSelected = () => {
    let selectedProfileFilters = 0;
    if (
      this.props.selectedPatronType !== "" ||
      this.props.selectedServiceType !== "" ||
      this.props.selectedStatusAndVitals !== "" ||
      this.props.selectedServiceHealthIssue !== ""
    ) {
      selectedProfileFilters = 1;
    }
    return (
      selectedProfileFilters + Object.values(this.props.selectedNeeds).length
    );
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
    const { t, store } = this.props;
    return (
      <ExpansionPanel
        className={root}
        defaultExpanded
        expanded={this.state.open}
      >
        <ExpansionPanelSummary
          className={summary}
          expandIcon={<ExpandMoreIcon />}
          onClick={() => this.toggleOpenState()}
        >
          <h2 variant="title" className={filterTitle}>
            {t("filters")}{" "}
          </h2>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Grid container>
            <Grid item sm={12} className={profileSelector}>
              <ProfileSelector t={t} store={store} />
            </Grid>
            <Grid item sm={12}>
              <NeedsSelector t={t} store={store} />

              {JSON.stringify(this.props.selectedNeeds) !== "{}" ||
              this.props.patronType !== "" ? (
                <h3 variant="title" className={filterTitle}>
                  <Button
                    className={clearButton}
                    id="ClearFiltersMobile"
                    variant="flat"
                    size="small"
                    onClick={() => {
                      this.clearFilters();
                    }}
                  >
                    {t("reset filters")} {"(" + this.countSelected() + ")"}
                  </Button>
                </h3>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

const mapDispatchToProps = dispatch => {
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
    selectedPatronType: reduxState.patronType,
    selectedServiceType: reduxState.serviceType,
    selectedStatusAndVitals: reduxState.statusAndVitals,
    selectedServiceHealthIssue: reduxState.serviceHealthIssue,
    patronType: reduxState.patronType
  };
};

ProfileNeedsSelectorMobile.propTypes = {
  selectedNeeds: PropTypes.object.isRequired,
  patronType: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  setPatronType: PropTypes.func.isRequired,
  setServiceType: PropTypes.func.isRequired,
  setStatusAndVitals: PropTypes.func.isRequired,
  setServiceHealthIssue: PropTypes.func.isRequired,
  setSelectedNeeds: PropTypes.func.isRequired,
  store: PropTypes.object,
  selectedPatronType: PropTypes.string.isRequired,
  selectedServiceType: PropTypes.string.isRequired,
  selectedStatusAndVitals: PropTypes.string.isRequired,
  selectedServiceHealthIssue: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileNeedsSelectorMobile);

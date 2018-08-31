import React, { Component } from "react";
import PropTypes from "prop-types";
import NeedsSelector from "./needs_selector";
import ProfileSelector from "./profile_selector";
import { connect } from "react-redux";
import { Grid, Button, Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { globalTheme } from "../theme";
import { css } from "react-emotion";

const root = css`
  padding: 25px !important;
  padding-top: 20px !important;
  background-color: #f5f5f5;
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    display: none;
  }
`;
  const profileSelector = css`
    border-bottom: 1px solid black;
    padding-bottom: 15px !important;
    margin-bottom: 30px !important;
`;
  const clearButton = css`
    text-decoration: underline !important;
    text-transform: unset !important;
    font-size: 60% !important;
    float: right !important;
`;
  const clearIcon = css`
    font-size: 100% !important;
    margin-left: ${globalTheme.unit};
    font-weight: bold;
`;
  const filterTitle = css`
    padding-right: 0px;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 22px;
`;

export class ProfileNeedsSelector extends Component {
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

  render() {
    const { t, pageWidth, store } = this.props;
    return (
      <Paper className={root}>
        <h2 variant="title" className={filterTitle}>
          {t("filters")}{" "}
          {JSON.stringify(this.props.selectedNeeds) !== "{}" ||
          this.props.patronType !== "" ? (
            <Button
              className={clearButton}
              id="ClearFilters"
              variant="flat"
              size="small"
              style={{ color: "blue" }}
              onClick={() => {
                this.clearFilters();
              }}
            >
              {t("reset filters")} {"(" + this.countSelected() + ")"}
              <CloseIcon className={clearIcon} />
            </Button>
          ) : (
            ""
          )}
        </h2>

        <Grid container>
          <Grid item sm={12} className={profileSelector}>
            <ProfileSelector t={t} store={store} />
          </Grid>
          <Grid item sm={12}>
            <NeedsSelector t={t} pageWidth={pageWidth} store={store} />
          </Grid>
        </Grid>
      </Paper>
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
    selectedPatronType: reduxState.patronType,
    selectedServiceType: reduxState.serviceType,
    selectedStatusAndVitals: reduxState.statusAndVitals,
    selectedServiceHealthIssue: reduxState.serviceHealthIssue,
    patronType: reduxState.patronType,
    pageWidth: reduxState.pageWidth
  };
};

ProfileNeedsSelector.propTypes = {
  selectedNeeds: PropTypes.object.isRequired,
  patronType: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  pageWidth: PropTypes.number.isRequired,
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
  mapDispatchToProps1
)(ProfileNeedsSelector);

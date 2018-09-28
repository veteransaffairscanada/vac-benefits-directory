import React, { Component } from "react";
import PropTypes from "prop-types";
import NeedsSelector from "./needs_selector";
import ProfileSelector from "./profile_selector";
import { connect } from "react-redux";
import { Grid, Paper } from "@material-ui/core";
import { globalTheme } from "../theme";
import { css } from "react-emotion";
import HeaderButton from "./header_button";
import CloseIcon from "@material-ui/icons/Close";

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
  font-size: 85% !important;
  float: right !important;
`;
const filterTitle = css`
  padding-right: 0px;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 22px;
`;
const closeIcon = css`
  font-size: 100% !important;
  margin-left: ${globalTheme.unit};
  font-weight: bold;
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
    this.props.saveQuestionResponse("patronType", "");
    this.props.saveQuestionResponse("serviceType", "");
    this.props.saveQuestionResponse("statusAndVitals", "");
    this.props.saveQuestionResponse("serviceHealthIssue", "");
    this.props.setSelectedNeeds({});
  };

  render() {
    const { t, store } = this.props;
    return (
      <Paper className={root}>
        <div variant="title" className={filterTitle}>
          {t("filters")}{" "}
          {JSON.stringify(this.props.selectedNeeds) !== "{}" ||
          this.props.patronType !== "" ? (
            <HeaderButton
              id={"ClearFilters"}
              className={clearButton}
              onClick={() => {
                this.clearFilters();
              }}
            >
              {t("reset filters")} {"(" + this.countSelected() + ")"}
              <CloseIcon className={closeIcon} />
            </HeaderButton>
          ) : (
            ""
          )}
        </div>

        <Grid container>
          <Grid item sm={12} className={profileSelector}>
            <ProfileSelector t={t} store={store} />
          </Grid>
          <Grid item sm={12}>
            <NeedsSelector t={t} store={store} />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapDispatchToProps1 = dispatch => {
  return {
    saveQuestionResponse: (question, response) => {
      dispatch({
        type: "SAVE_QUESTION_RESPONSE",
        data: { [question]: response }
      });
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

ProfileNeedsSelector.propTypes = {
  selectedNeeds: PropTypes.object.isRequired,
  patronType: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  saveQuestionResponse: PropTypes.func.isRequired,
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

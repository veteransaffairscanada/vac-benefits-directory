import React, { Component } from "react";
import PropTypes from "prop-types";
import NeedsSelector from "./needs_selector";
import ProfileSelector from "./profile_selector";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { globalTheme } from "../theme";
import { css } from "react-emotion";
import HeaderButton from "./header_button";
import CloseIcon from "./icons/Close";
import Paper from "./paper";
import Header from "./typography/header";

const root = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    display: none;
  }
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
const noMargin = css`
  margin: 0px;
`;
export class ProfileNeedsSelector extends Component {
  state = {
    open: false
  };

  countSelected = () => {
    let selectedProfileFilters = 0;
    this.props.profileQuestions.forEach(question => {
      if (this.props.responses[question.variable_name]) {
        selectedProfileFilters = 1;
      }
    });
    return (
      selectedProfileFilters + Object.values(this.props.selectedNeeds).length
    );
  };

  clearFilters = () => {
    this.props.profileQuestions.forEach(q => {
      this.props.saveQuestionResponse(q.variable_name, "");
    });
    this.props.saveQuestionResponse("selectedNeeds", {});
  };

  render() {
    const { t, store } = this.props;
    return (
      <Paper padding="sm" className={root}>
        <div variant="title" className={filterTitle}>
          <Header headingLevel="h2" size="md">
            {t("filters")}
          </Header>{" "}
          {this.countSelected() > 0 ? (
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
          <Grid item sm={12}>
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

const mapDispatchToProps = dispatch => {
  return {
    saveQuestionResponse: (question, response) => {
      dispatch({
        type: "SAVE_QUESTION_RESPONSE",
        data: { [question]: response }
      });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    profileQuestions: reduxState.questions.filter(
      q => q.variable_name !== "needs"
    ),
    responses: reduxState,
    selectedNeeds: reduxState.selectedNeeds
  };
};

ProfileNeedsSelector.propTypes = {
  profileQuestions: PropTypes.array.isRequired,
  responses: PropTypes.object.isRequired,
  saveQuestionResponse: PropTypes.func.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileNeedsSelector);

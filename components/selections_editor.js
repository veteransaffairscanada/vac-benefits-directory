import React, { Component } from "react";
import PropTypes from "prop-types";
import NeedsSelector from "./needs_selector";
import ProfileSelector from "./profile_selector";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { globalTheme } from "../theme";
import { css } from "emotion";
import HeaderButton from "./header_button";
import Header from "./typography/header";
import CloseIcon from "./icons/Close";
import EditIcon from "./icons/Edit";

const root = css`
  background-color: ${globalTheme.colour.white} !important;
  border: thin solid ${globalTheme.colour.darkPaleGrey} !important;
  box-shadow: none !important;
  margin-top: 30px;
  padding: 25px;
`;
const clearButton = css`
  font-size: 16px !important;
`;
const filterTitle = css`
  font-size: 30px !important;
  padding-right: 0px;
  padding-left: 10px;
  color: ${globalTheme.colour.greyishBrown};
`;
const closeIcon = css`
  font-size: 100% !important;
  margin-left ${globalTheme.unit};
  font-weight: bold;
`;

export class SelectionsEditor extends Component {
  state = {
    open: false
  };

  countSelected = () => {
    let selectedProfileFilters = 0;
    // this.props.profileQuestions.forEach(question => {
    //   if (this.props.responses[question.variable_name]) {
    //     selectedProfileFilters = 1;
    //   }
    // });
    return selectedProfileFilters; //+ Object.values(this.props.selectedNeeds).length
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
      <Grid container className={root}>
        <Header size="sm_md" className={filterTitle}>
          {t("directory.edit_selections")}
        </Header>
        <Grid item xs={12}>
          {this.countSelected() > 0 ? (
            <HeaderButton
              id="ClearFilters"
              className={clearButton}
              onClick={() => {
                this.clearFilters();
              }}
            >
              {t("reset filters")} {"(" + this.countSelected() + ")"}
            </HeaderButton>
          ) : null}
        </Grid>

        <Grid item xs={12}>
          <ProfileSelector t={t} store={store} />
        </Grid>
        <Grid item xs={12}>
          <NeedsSelector t={t} store={store} />
        </Grid>
      </Grid>
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

SelectionsEditor.propTypes = {
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
)(SelectionsEditor);

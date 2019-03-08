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
import { getProfileFilters } from "../selectors/benefits";

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
  color: ${globalTheme.colour.greyishBrown};
`;

export class SelectionsEditor extends Component {
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

  updateQuery = (url, profileFiltersUnparsed) => {
    const profileFilters = JSON.parse(JSON.stringify(profileFiltersUnparsed));
    // profileFilters.forEach( (question, response) => {
    //   //url.query[question] = question[response]
    //   console.log(question);
    //   console.log(response);
    // });
    // profileFilters.forEach(q => {
    //   console.log(q);
    // });

    this.props.profileQuestions.forEach((q, i) => {
      if (q.variable_name !== "feedback") {
        // console.log(q.variable_name);
        // console.log(profileFilters[q.variable_name]);
        // console.log(url.query);
        //url.query = profileFilters[q.variable_name];
        //this.props.saveQuestionResponse(q.variable_name, "");
      }
    });
  };

  render() {
    const { t, store, url, profileFilters } = this.props;
    this.updateQuery(url, profileFilters);
    //console.log(getProfileFilters(this.props.reduxState));
    // url.query.patronType =
    //console.log(JSON.stringify(this.props.reduxState.profile));
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
          <ProfileSelector t={t} store={store} url={url} />
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
    reduxState: reduxState,
    profileFilters: getProfileFilters(reduxState),
    profileQuestions: reduxState.questions.filter(
      q => q.variable_name !== "needs"
    ),
    responses: reduxState,
    selectedNeeds: reduxState.selectedNeeds
  };
};

SelectionsEditor.propTypes = {
  url: PropTypes.object.isRequired,
  reduxState: PropTypes.object.isRequired,
  profileFilters: PropTypes.object.isRequired,
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

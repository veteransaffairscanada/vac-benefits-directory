import React, { Component } from "react";
import PropTypes from "prop-types";
import RadioSelector from "./radio_selector";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { showQuestion } from "../utils/common";

export class ProfileSelector extends Component {
  componentDidUpdate() {
    this.props.profileQuestions.forEach((question, index) => {
      if (
        this.props.reduxState[question.variable_name] &&
        !showQuestion(question.variable_name, index, this.props.reduxState)
      ) {
        this.props.saveQuestionResponse(question.variable_name, "");
      }
    });
  }

  render() {
    const { t } = this.props;
    const { questions, multipleChoiceOptions } = this.props.reduxState;
    let jsx_array = [];

    questions.forEach((question, index) => {
      if (showQuestion(question.variable_name, index, this.props.reduxState)) {
        const options = multipleChoiceOptions
          .filter(mco => question.variable_name === mco.linked_question[0])
          .map(x => x.variable_name);

        jsx_array.push(
          <Grid item xs={12} key={question.variable_name + "RadioSelector"}>
            <RadioSelector
              id={question.variable_name + "RadioSelector"}
              t={t}
              legend={
                t("current-language-code") === "en"
                  ? question.display_text_english
                  : question.display_text_french
              }
              selectorType={question.variable_name}
              options={options}
              tooltipText={
                t("current-language-code") === "en"
                  ? question.tooltip_english
                  : question.tooltip_french
              }
              store={this.props.store}
            />
          </Grid>
        );
      }
    });

    return (
      <div>
        <Grid container spacing={8}>
          {jsx_array}
        </Grid>
      </div>
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
    profileQuestions: reduxState.questions.filter(
      q => q.variable_name != "needs"
    )
  };
};

ProfileSelector.propTypes = {
  t: PropTypes.func.isRequired,
  reduxState: PropTypes.object.isRequired,
  store: PropTypes.object,
  saveQuestionResponse: PropTypes.func.isRequired,
  profileQuestions: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSelector);

import React, { Component } from "react";
import PropTypes from "prop-types";
import RadioSelector from "./radio_selector";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

export class ProfileSelector extends Component {
  showQuestion = (question, index, reduxState) => {
    const {
      questions,
      multipleChoiceOptions,
      questionDisplayLogic
    } = reduxState;

    let questionDict = {};
    questions.forEach(x => {
      questionDict[x.id] = x.variable_name;
    });

    let optionDict = {};
    multipleChoiceOptions.forEach(x => {
      optionDict[x.variable_name] = x.id;
    });

    if (index === 0) {
      return true;
    }

    // show if the previous question has an answer
    const previousQuestionAnswered =
      reduxState[questions[index - 1].variable_name] !== "";
    if (!previousQuestionAnswered) {
      return false;
    }

    const relevantLogic = questionDisplayLogic.filter(x => {
      return (
        x["exclude questions"] &&
        x["exclude questions"].indexOf(question.id) > -1
      );
    });

    if (!relevantLogic) {
      return true;
    }

    let return_value = true;
    relevantLogic.forEach(x => {
      const questionId = x.question[0];
      const users_answer = reduxState[questionDict[questionId]];
      const users_answer_id = optionDict[users_answer];
      if (x["has value"].indexOf(users_answer_id) > -1) {
        return_value = false;
      }
    });

    return return_value;
  };

  render() {
    const { t } = this.props;
    const { questions, multipleChoiceOptions } = this.props.reduxState;
    let jsx_array = [];

    questions.forEach((question, index) => {
      if (this.showQuestion(question, index, this.props.reduxState)) {
        const options = multipleChoiceOptions
          .filter(mco => question.id === mco.linked_question[0])
          .map(x => x.variable_name);

        jsx_array.push(
          <Grid
            item
            xs={12}
            key={question.variable_name + "Filter"}
            className={question.variable_name + "Filter"}
          >
            <RadioSelector
              t={t}
              legend={
                t("current-language-code") === "en"
                  ? question.display_text_english
                  : question.display_text_french
              }
              selectorType={question.variable_name}
              options={options}
              store={this.props.store}
            />
          </Grid>
        );
      }
    });

    // legend={t(
    //   this.props.statusAndVitals === "deceased"
    //     ? "health issue question deceased"
    //     : "health issue question"
    // )}

    return (
      <div>
        <Grid container spacing={8}>
          {jsx_array}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState,
    statusAndVitals: reduxState.statusAndVitals
  };
};

ProfileSelector.propTypes = {
  t: PropTypes.func.isRequired,
  reduxState: PropTypes.object.isRequired,
  statusAndVitals: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(ProfileSelector);

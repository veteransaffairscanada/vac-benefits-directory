import React, { Component } from "react";
import PropTypes from "prop-types";
import RadioSelector from "./radio_selector";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

export class ProfileSelector extends Component {
  showQuestion = (
    question,
    questions,
    index,
    reduxState,
    questionDisplayLogic,
    questionDict,
    optionDict
  ) => {
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
    const {
      t,
      questions,
      questionDisplayLogic,
      multipleChoiceOptions
    } = this.props;
    let jsx_array = [];

    const questionDict = {};
    questions.forEach(x => {
      questionDict[x.id] = x.variable_name;
    });

    const optionDict = {};
    multipleChoiceOptions.forEach(x => {
      optionDict[x.variable_name] = x.id;
    });

    questions.forEach((question, index) => {
      if (
        this.showQuestion(
          question,
          questions,
          index,
          this.props.reduxState,
          questionDisplayLogic,
          questionDict,
          optionDict
        )
      ) {
        const options = this.props.multipleChoiceOptions
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
    statusAndVitals: reduxState.statusAndVitals,
    questions: reduxState.questions,
    questionDisplayLogic: reduxState["question display logic"],
    multipleChoiceOptions: reduxState["multiple choice options"]
  };
};

ProfileSelector.propTypes = {
  t: PropTypes.func.isRequired,
  reduxState: PropTypes.object.isRequired,
  statusAndVitals: PropTypes.string.isRequired,
  store: PropTypes.object,
  questions: PropTypes.array.isRequired,
  questionDisplayLogic: PropTypes.array.isRequired,
  multipleChoiceOptions: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(ProfileSelector);

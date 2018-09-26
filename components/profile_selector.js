import React, { Component } from "react";
import PropTypes from "prop-types";
import RadioSelector from "./radio_selector";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { showQuestion } from "../utils/common";

export class ProfileSelector extends Component {
  render() {
    const { t } = this.props;
    const { questions, multipleChoiceOptions } = this.props.reduxState;
    let jsx_array = [];

    questions.forEach((question, index) => {
      if (showQuestion(question, index, this.props.reduxState)) {
        const options = multipleChoiceOptions
          .filter(mco => question.variable_name === mco.linked_question[0])
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

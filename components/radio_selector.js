import React from "react";
import PropTypes from "prop-types";
import { FormControl, FormControlLabel } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { connect } from "react-redux";
import { logEvent } from "../utils/analytics";
import { uuidv4 } from "../utils/common";
import { globalTheme } from "../theme";
import { css } from "react-emotion";
import Header4 from "./typography/header4";
import Tooltip from "./tooltip";

const formControl = css`
  margin-top: ${globalTheme.unit} !important;
`;
const formLabel = css`
  margin-bottom: 10px;
`;
const underline = css`
  line-height: 160%;
  border-bottom: 2px dotted ${globalTheme.colour.greyishBrown};
`;

export class RadioSelector extends React.Component {
  isDisabled = (option, responses, questionDisplayLogic) => {
    let returnValue = false;
    questionDisplayLogic.forEach(row => {
      if (
        responses[row.question] &&
        row["has value"] &&
        row["exclude options"] &&
        responses[row.question] === row["has value"][0] &&
        row["exclude options"].indexOf(option) > -1
      ) {
        returnValue = true;
      }
    });
    return returnValue;
  };

  clearAppropriateResponses = (question, response) => {
    const {
      questions,
      responses,
      saveQuestionResponse,
      questionClearLogic
    } = this.props;

    const previousResponses = questions
      .map(q => q.variable_name)
      .map(v => responses[v]);

    questionClearLogic.forEach(row => {
      if (
        row["Question"] &&
        row["Response"] &&
        row["Clear Questions"] &&
        row["Question"][0] === question &&
        row["Response"][0] === response &&
        (!row["Previous Response"] ||
          previousResponses.indexOf(row["Previous Response"][0]) > -1)
      ) {
        row["Clear Questions"].forEach(question => {
          saveQuestionResponse(question, "");
        });
      }
    });
  };

  handleSelect = event => {
    const question = this.props.selectorType;
    const response = event.target.value;
    logEvent("FilterClick", question, response);
    this.props.saveQuestionResponse(question, response);
    this.clearAppropriateResponses(question, response);
  };

  render() {
    const guid = uuidv4();

    const options = this.props.options
      ? this.props.options
      : Array.from(
          new Set(
            this.props.eligibilityPaths.map(ep => ep[this.props.selectorType])
          )
        ).filter(st => st !== "na");

    const { t, selectorType, responses, legend, tooltipText } = this.props;

    if (Object.keys(options).length !== 0) {
      return (
        <FormControl className={formControl}>
          <Tooltip
            disabled={!tooltipText}
            tooltipText={tooltipText}
            width={250}
          >
            <Header4 className={formLabel}>
              <span className={tooltipText ? underline : ""}>{legend}</span>
            </Header4>
          </Tooltip>
          <RadioGroup
            aria-label={legend}
            value={responses[selectorType]}
            onChange={this.handleSelect}
          >
            {options.map(option => {
              return (
                <FormControlLabel
                  key={option}
                  value={option}
                  htmlFor={option + guid}
                  control={<Radio color="primary" id={option + guid} />}
                  label={t(option)}
                  disabled={this.isDisabled(
                    option,
                    responses,
                    this.props.questionDisplayLogic
                  )}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      );
    } else {
      return null;
    }
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
    eligibilityPaths: reduxState.eligibilityPaths,
    questions: reduxState.questions,
    questionDisplayLogic: reduxState.questionDisplayLogic,
    questionClearLogic: reduxState.questionClearLogic,
    responses: reduxState
  };
};

RadioSelector.propTypes = {
  legend: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  responses: PropTypes.object.isRequired,
  saveQuestionResponse: PropTypes.func.isRequired,
  selectorType: PropTypes.string.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  questions: PropTypes.array.isRequired,
  questionDisplayLogic: PropTypes.array.isRequired,
  questionClearLogic: PropTypes.array.isRequired,
  options: PropTypes.array,
  tooltipText: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadioSelector);

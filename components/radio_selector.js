import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logEvent } from "../utils/analytics";
import { globalTheme } from "../theme";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Header from "./typography/header";
import Tooltip from "./tooltip";
import Radio from "./radio";
import Router from "next/router";
import { mutateUrl } from "../utils/common";

const formControl = css`
  margin-top: ${globalTheme.unit} !important;
`;
const formLabel = css`
  margin-bottom: 10px;
  color: ${globalTheme.colour.greyishBrown};
  font-size: 16px;
  font-bold: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
`;
const radioOption = css`
  margin-bottom: 10px;
`;
const underline = css`
  line-height: 160%;
  border-bottom: 2px dotted ${globalTheme.colour.greyishBrown};
`;
const leftIndent = css`
  margin-left: 40px;
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    margin-left: 0px;
  }
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
    this.props.saveQuestionResponse(question, response);
    this.clearAppropriateResponses(question, response);
    logEvent("FilterClick", question, response);
    if (this.props.updateUrl) {
      this.props.url.query[question] = response;
      Router.replace(mutateUrl(this.props.url, "", this.props.url.query));
    }
  };

  render() {
    const options = this.props.multipleChoiceOptions
      .filter(mco => this.props.options.indexOf(mco.id) !== -1)
      .filter(
        option =>
          !this.isDisabled(
            option.variable_name,
            this.props.responses,
            this.props.questionDisplayLogic
          )
      );

    const {
      t,
      selectorType,
      responses,
      legend,
      tooltipText,
      styles
    } = this.props;
    if (options.length !== 0) {
      return (
        <div css={formControl}>
          <Tooltip
            disabled={!tooltipText}
            tooltipText={tooltipText}
            width={250}
          >
            <Header styles={formLabel} size="sm">
              <span css={tooltipText ? underline : ""}>{legend}</span>
            </Header>
          </Tooltip>

          <div
            aria-label={legend}
            css={styles ? [leftIndent, styles] : leftIndent}
          >
            {options.map(option => {
              return (
                <Radio
                  key={option.variable_name}
                  checked={responses[selectorType] === option.variable_name}
                  onChange={this.handleSelect}
                  value={option.variable_name}
                  css={radioOption}
                  sidebar={this.props.updateUrl}
                >
                  {t("current-language-code") === "en"
                    ? option.display_text_english
                    : option.display_text_french}
                </Radio>
              );
            })}
          </div>
        </div>
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
    multipleChoiceOptions: reduxState.multipleChoiceOptions,
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
  multipleChoiceOptions: PropTypes.array.isRequired,
  questions: PropTypes.array.isRequired,
  questionDisplayLogic: PropTypes.array.isRequired,
  questionClearLogic: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  tooltipText: PropTypes.string,
  store: PropTypes.object,
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string,
  updateUrl: PropTypes.bool,
  url: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadioSelector);

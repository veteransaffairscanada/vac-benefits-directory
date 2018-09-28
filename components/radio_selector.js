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

const formControl = css`
  margin-top: ${globalTheme.unit} !important;
`;
const formLabel = css`
  margin-bottom: 10px;
`;

export class RadioSelector extends React.Component {
  isDisabled = (option, patronType, serviceType) => {
    if (option === "stillServing" && serviceType === "WSV (WWII or Korea)") {
      return true;
    }
    if (option === "deceased" && patronType === "service-person") {
      return true;
    }
    return false;
  };

  clearAppropriateResponses = (question, response) => {
    const { responses, saveQuestionResponse } = this.props;

    switch (question) {
      case "patronType":
        if (response === "organization") {
          saveQuestionResponse("serviceType", "");
          saveQuestionResponse("statusAndVitals", "");
          saveQuestionResponse("serviceHealthIssue", "");
        }
        if (
          response === "service-person" &&
          responses.statusAndVitals === "deceased"
        ) {
          saveQuestionResponse("statusAndVitals", "");
          saveQuestionResponse("serviceHealthIssue", "");
        }
        if (
          response === "service-person" &&
          responses.serviceType === "WSV (WWII or Korea)" &&
          responses.statusAndVitals !== ""
        ) {
          saveQuestionResponse("statusAndVitals", "");
          saveQuestionResponse("serviceHealthIssue", "");
        }
        break;
      case "serviceType":
        if (
          response === "WSV (WWII or Korea)" &&
          responses.statusAndVitals === "stillServing"
        ) {
          saveQuestionResponse("statusAndVitals", "");
          saveQuestionResponse("serviceHealthIssue", "");
        }
        if (
          response === "WSV (WWII or Korea)" &&
          responses.patronType === "service-person" &&
          responses.statusAndVitals !== ""
        ) {
          saveQuestionResponse("statusAndVitals", "");
          saveQuestionResponse("serviceHealthIssue", "");
        }
        if (
          (response === "RCMP" || response === "CAF") &&
          responses.statusAndVitals === ""
        ) {
          saveQuestionResponse("serviceHealthIssue", "");
        }
        break;
    }
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

    const { t, selectorType, responses } = this.props;

    if (Object.keys(options).length !== 0) {
      return (
        <FormControl className={formControl}>
          <Header4 className={formLabel}>{this.props.legend}</Header4>
          <RadioGroup
            aria-label={this.props.legend}
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
                    responses.patronType,
                    responses.serviceType
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
  options: PropTypes.array,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadioSelector);

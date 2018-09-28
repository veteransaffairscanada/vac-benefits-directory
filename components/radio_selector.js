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
  isDisabled = (filter_id, patronType, serviceType) => {
    if (serviceType === "WSV (WWII or Korea)" && filter_id === "stillServing") {
      return true;
    }
    if (patronType === "service-person" && filter_id === "deceased") {
      return true;
    }
    return false;
  };

  clearAppropriateResponses = (question, response) => {
    const { questionResponse, saveQuestionResponse } = this.props;

    switch (question) {
      case "patronType":
        if (response === "organization") {
          saveQuestionResponse("serviceType", "");
          saveQuestionResponse("statusAndVitals", "");
          saveQuestionResponse("serviceHealthIssue", "");
        }
        if (
          response === "service-person" &&
          questionResponse("statusAndVitals") === "deceased"
        ) {
          saveQuestionResponse("statusAndVitals", "");
          saveQuestionResponse("serviceHealthIssue", "");
        }
        if (
          response === "service-person" &&
          questionResponse("serviceType") === "WSV (WWII or Korea)" &&
          questionResponse("statusAndVitals") !== ""
        ) {
          saveQuestionResponse("statusAndVitals", "");
          saveQuestionResponse("serviceHealthIssue", "");
        }
        break;
      case "serviceType":
        if (
          response === "WSV (WWII or Korea)" &&
          questionResponse("statusAndVitals") === "stillServing"
        ) {
          saveQuestionResponse("statusAndVitals", "");
          saveQuestionResponse("serviceHealthIssue", "");
        }
        if (
          response === "WSV (WWII or Korea)" &&
          questionResponse("patronType") === "service-person" &&
          questionResponse("statusAndVitals") !== ""
        ) {
          saveQuestionResponse("statusAndVitals", "");
          saveQuestionResponse("serviceHealthIssue", "");
        }
        if (
          (response === "RCMP" || response === "CAF") &&
          questionResponse("statusAndVitals") === ""
        ) {
          saveQuestionResponse("serviceHealthIssue", "");
        }
        break;
    }
  };

  setUserProfile = (question, response) => {
    logEvent("FilterClick", question, response);
    this.props.saveQuestionResponse(question, response);
    this.clearAppropriateResponses(question, response);
  };

  handleSelect = event => {
    this.setUserProfile(this.props.selectorType, event.target.value);
  };

  render() {
    const guid = uuidv4();

    const allFilterIds = this.props.options
      ? this.props.options
      : Array.from(
          new Set(
            this.props.eligibilityPaths.map(ep => ep[this.props.selectorType])
          )
        ).filter(st => st !== "na");

    const { t, selectorType, questionResponse } = this.props;

    if (Object.keys(allFilterIds).length != 0) {
      return (
        <FormControl className={formControl}>
          <Header4 className={formLabel}>{this.props.legend}</Header4>
          <RadioGroup
            aria-label={this.props.legend}
            value={questionResponse(selectorType)}
            onChange={this.handleSelect}
          >
            {allFilterIds.map(filter_id => {
              return (
                <FormControlLabel
                  key={filter_id}
                  value={filter_id}
                  htmlFor={filter_id + guid}
                  control={<Radio color="primary" id={filter_id + guid} />}
                  label={t(filter_id)}
                  disabled={this.isDisabled(
                    filter_id,
                    questionResponse("patronType"),
                    questionResponse("serviceType")
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
    questionResponse: question => reduxState[question],
    eligibilityPaths: reduxState.eligibilityPaths
  };
};

RadioSelector.propTypes = {
  legend: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  questionResponse: PropTypes.func.isRequired,
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

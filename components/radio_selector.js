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

  setUserProfile = (criteria, id) => {
    logEvent("FilterClick", criteria, id);
    this.props.saveQuestionResponse(criteria, id);
    switch (criteria) {
      case "patronType":
        if (id === "organization") {
          this.props.saveQuestionResponse("serviceType", "");
          this.props.saveQuestionResponse("statusAndVitals", "");
          this.props.saveQuestionResponse("serviceHealthIssue", "");
        }
        if (
          id === "service-person" &&
          this.props.selectedStatusAndVitals === "deceased"
        ) {
          this.props.saveQuestionResponse("statusAndVitals", "");
          this.props.saveQuestionResponse("serviceHealthIssue", "");
        }
        if (
          id === "service-person" &&
          this.props.selectedServiceType === "WSV (WWII or Korea)" &&
          this.props.selectedStatusAndVitals !== ""
        ) {
          this.props.saveQuestionResponse("statusAndVitals", "");
          this.props.saveQuestionResponse("serviceHealthIssue", "");
        }
        break;
      case "serviceType":
        if (
          id === "WSV (WWII or Korea)" &&
          this.props.selectedStatusAndVitals === "stillServing"
        ) {
          this.props.saveQuestionResponse("statusAndVitals", "");
          this.props.saveQuestionResponse("serviceHealthIssue", "");
        }
        if (
          id === "WSV (WWII or Korea)" &&
          this.props.selectedPatronType === "service-person" &&
          this.props.selectedStatusAndVitals !== ""
        ) {
          this.props.saveQuestionResponse("statusAndVitals", "");
          this.props.saveQuestionResponse("serviceHealthIssue", "");
        }
        if (
          (id === "RCMP" || id === "CAF") &&
          this.props.selectedStatusAndVitals === ""
        ) {
          this.props.saveQuestionResponse("serviceHealthIssue", "");
        }

        break;
      case "statusAndVitals":
        break;
      case "serviceHealthIssue":
        break;
      default:
        return true;
    }
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

    const { t, selectorType } = this.props;
    const selected = {
      patronType: this.props.selectedPatronType,
      serviceType: this.props.selectedServiceType,
      statusAndVitals: this.props.selectedStatusAndVitals,
      serviceHealthIssue: this.props.selectedServiceHealthIssue
    };

    if (Object.keys(allFilterIds).length != 0) {
      return (
        <FormControl className={formControl}>
          <Header4 className={formLabel}>{this.props.legend}</Header4>
          <RadioGroup
            aria-label={this.props.legend}
            value={selected[selectorType]}
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
                    this.props.selectedPatronType,
                    this.props.selectedServiceType
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
    selectedPatronType: reduxState.patronType,
    selectedServiceType: reduxState.serviceType,
    selectedStatusAndVitals: reduxState.statusAndVitals,
    selectedServiceHealthIssue: reduxState.serviceHealthIssue,
    eligibilityPaths: reduxState.eligibilityPaths
  };
};

RadioSelector.propTypes = {
  legend: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  selectedPatronType: PropTypes.string.isRequired,
  selectedServiceType: PropTypes.string.isRequired,
  selectedStatusAndVitals: PropTypes.string.isRequired,
  selectedServiceHealthIssue: PropTypes.string.isRequired,
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

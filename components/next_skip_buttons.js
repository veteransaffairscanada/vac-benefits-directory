import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "./button";
import { connect } from "react-redux";
import Router from "next/router";
import HeaderButton from "./header_button";
import { mutateUrl } from "../utils/common";
import { showQuestion } from "../utils/common";

export class NextSkipButtons extends Component {
  queryParamsToClear = () => {
    return this.props.reduxState.questions
      .map(x => x.variable_name)
      .filter((x, i) => !showQuestion(x, i, this.props.reduxState))
      .map(x => {
        if (x === "needs") {
          return { key: "selectedNeeds", value: {} };
        } else {
          return { key: x, value: "" };
        }
      });
  };

  getDisplayableSections = reduxState => {
    return this.props.reduxState.questions
      .map(x => x.variable_name)
      .filter((x, i) => showQuestion(x, i, reduxState));
  };

  returnGoToNextSection = clearCurrentQuestion => {
    let goToNextSection = () => {
      const { id, reduxState, url, saveQuestionResponse } = this.props;
      let params = {};
      this.queryParamsToClear().forEach(x => {
        params[x.key] = x.value;
      });

      // modifiedReduxState exists so we are sure the redux state updates before we do Router push
      let modifiedReduxState = JSON.parse(JSON.stringify(reduxState));
      if (clearCurrentQuestion) {
        if (id === "needs") {
          saveQuestionResponse("selectedNeeds", {});
          modifiedReduxState.selectedNeeds = {};
        } else {
          saveQuestionResponse(id, "");
          modifiedReduxState[id] = "";
        }
      }

      const displayable_sections = this.getDisplayableSections(
        modifiedReduxState
      );
      const dynamicStepNumber = displayable_sections.indexOf(id);
      let nextSection;
      if (dynamicStepNumber + 1 >= displayable_sections.length) {
        nextSection = "summary";
        if (clearCurrentQuestion && id === "needs") {
          params.selectedNeeds = {};
          const newUrl = mutateUrl(url, "/summary", params);
          window.location.href = newUrl;
          document.body.focus();
        } else {
          Router.push(mutateUrl(url, "/summary", params)).then(() =>
            window.scrollTo(0, 0)
          );
          document.body.focus();
        }
      } else {
        nextSection = displayable_sections[dynamicStepNumber + 1];
        if (clearCurrentQuestion) {
          params[id] = "";
        }
        Router.push(mutateUrl(url, "/" + nextSection, params)).then(() =>
          window.scrollTo(0, 0)
        );
        document.body.focus();
      }
    };
    return goToNextSection;
  };

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <Button
          id="nextButton"
          arrow={true}
          onClick={this.returnGoToNextSection(false)}
        >
          {t("next")}{" "}
        </Button>
        <HeaderButton
          id="skipButton"
          altStyle="grey"
          onClick={this.returnGoToNextSection(true)}
        >
          {t("ge.skip")}
        </HeaderButton>
      </React.Fragment>
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
    sectionOrder: reduxState.questions.map(x => x.variable_name)
  };
};

NextSkipButtons.propTypes = {
  t: PropTypes.func.isRequired,
  saveQuestionResponse: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  reduxState: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NextSkipButtons);

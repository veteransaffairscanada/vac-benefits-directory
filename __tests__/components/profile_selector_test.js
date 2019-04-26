import React from "react";
import { mount } from "enzyme";
import { ProfileSelector } from "../../components/profile_selector";
import benefitEligibilityFixture from "../fixtures/benefitEligibility";
import questionsFixture from "../fixtures/questions";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import questionClearLogicFixture from "../fixtures/question_clear_logic";

jest.unmock("../../utils/common");
const common = require.requireActual("../../utils/common");

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
import configureStore from "redux-mock-store";

describe("ProfileSelector", () => {
  let props;
  let mockStore, reduxState;

  beforeEach(() => {
    props = {
      t: key => key,
      url: { route: "/benefits-directory" }
    };
    reduxState = {
      patronType: "family",
      profileQuestions: questionsFixture.filter(
        q => q.variable_name !== "needs"
      ),
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionClearLogicFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      benefitEligibility: benefitEligibilityFixture,
      saveQuestionResponse: jest.fn()
    };
    mockStore = configureStore();
    props.store = mockStore(reduxState);
    props.reduxState = reduxState;
  });

  it("passes axe tests", async () => {
    let html = mount(<ProfileSelector {...props} {...reduxState} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a RadioSelector", () => {
    expect(
      mount(<ProfileSelector {...props} {...reduxState} />)
        .find("#patronTypeRadioSelector")
        .first().length
    ).toEqual(1);
  });

  describe("componentDidUpdate function", () => {
    it("doesn't clear visable questions", () => {
      common.showQuestion = jest.fn(() => true);
      const profileSelector = mount(
        <ProfileSelector {...props} {...reduxState} />
      ).instance();
      profileSelector.componentDidUpdate();
      expect(reduxState.saveQuestionResponse).not.toBeCalled();
    });

    it("clears hidden questions", () => {
      common.showQuestion = jest.fn(() => false);
      const profileSelector = mount(
        <ProfileSelector {...props} {...reduxState} />
      ).instance();
      profileSelector.componentDidUpdate();
      expect(reduxState.saveQuestionResponse).toBeCalledWith("patronType", "");
    });
  });
});

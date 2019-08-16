import { FeedbackForm } from "../../components/feedback_form";
import React from "react";
import { mount } from "enzyme";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
import translate from "../fixtures/translate";
import multipleChoiceOptions from "../fixtures/multiple_choice_options_complex";
import benefitEligibilityFixture from "../fixtures/benefitEligibility_complex";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import questionClearLogicFixture from "../fixtures/question_clear_logic";
import questionsFixture from "../fixtures/questions_complex";
import configureStore from "redux-mock-store";

describe("Feedback Form", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: translate,
      url: { query: {}, route: "/feedback" }
    };
    reduxData = {
      questions: questionsFixture,
      betaFeedback: "your site is awesome",
      multipleChoiceOptions: multipleChoiceOptions,
      benefitEligibility: benefitEligibilityFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionClearLogicFixture
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(<FeedbackForm {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
  it("contains a back button", async () => {
    expect(mount(<FeedbackForm {...props} {...reduxData} />).text()).toContain(
      "back"
    );
  });
  it("contains the RadioSelector component", async () => {
    expect(
      mount(<FeedbackForm {...props} {...reduxData} />).find("RadioSelector")
        .length
    ).toEqual(1);
  });
  it("contains a send button", async () => {
    expect(mount(<FeedbackForm {...props} {...reduxData} />).text()).toContain(
      "send"
    );
  });
  it("contains the details component", async () => {
    expect(
      mount(<FeedbackForm {...props} {...reduxData} />).find("Details").length
    ).toEqual(1);
  });
});

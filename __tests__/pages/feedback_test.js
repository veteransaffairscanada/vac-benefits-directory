/* eslint-env jest */
import React from "react";
import { mount } from "enzyme";
import { Feedback } from "../../pages/feedback";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
import questionsFixture from "../fixtures/questions_complex";
import configureStore from "redux-mock-store";
import multipleChoiceOptions from "../fixtures/multiple_choice_options_complex";
import benefitEligibilityFixture from "../fixtures/benefitEligibility_complex";
import translate from "../fixtures/translate";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import questionClearLogicFixture from "../fixtures/question_clear_logic";
import Router from "next/router";

jest.mock("react-ga");

describe("Feedback", () => {
  let props;
  let mockStore, reduxData;
  Router.push = jest.fn().mockImplementation(() => new Promise(() => true));

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
    let html = mount(<Feedback {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});

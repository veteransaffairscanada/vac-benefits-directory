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

jest.mock("react-ga");

describe("Feedback", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: translate
    };
    reduxData = {
      questions: questionsFixture,
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

  it("contains a back button", async () => {
    expect(mount(<Feedback {...props} {...reduxData} />).text()).toContain(
      "back"
    );
  });
  it("contains the RadioSelector component", async () => {
    expect(
      mount(<Feedback {...props} {...reduxData} />).find("RadioSelector").length
    ).toEqual(1);
  });
  it("contains a send button", async () => {
    expect(mount(<Feedback {...props} {...reduxData} />).text()).toContain(
      "send"
    );
  });
});

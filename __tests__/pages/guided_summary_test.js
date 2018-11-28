import { GuidedSummary } from "../../pages/guided_summary";
import { mount } from "enzyme";
import React from "react";
import benefitsFixture from "../fixtures/benefits";
import translate from "../fixtures/translate";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import questionsFixture from "../fixtures/questions";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import multipleChoiceOptions from "../fixtures/multiple_choice_options";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("GuidedSummary", () => {
  let props;
  let mockStore, reduxState;

  beforeEach(() => {
    props = {
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: translate
    };

    mockStore = configureStore();
    reduxState = {
      benefits: benefitsFixture,
      eligibilityPaths: eligibilityPathsFixture,
      needs: needsFixture,
      selectedNeeds: {},
      serviceType: "s1",
      patronType: "p1",
      option: "",
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionDisplayLogicFixture,
      multipleChoiceOptions: multipleChoiceOptions
    };
    props.store = mockStore(reduxState);
  });

  it("passes axe tests", async () => {
    let html = mount(<GuidedSummary {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("renders page title", async () => {
    let text = mount(<GuidedSummary {...props} />).text();
    expect(text).toContain("ge.summary_subtitle");
  });

  it("the Next buttons says 'Show Results' if the section is the summary", () => {
    props.id = "summary";
    expect(
      mount(<GuidedSummary {...props} />)
        .find("Button")
        .last()
        .text()
    ).toContain("ge.show_results");
  });
});

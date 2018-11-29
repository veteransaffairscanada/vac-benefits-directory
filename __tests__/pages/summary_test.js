import { Summary } from "../../pages/summary";
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

describe("Summary", () => {
  let props;
  let mockStore, reduxState;

  beforeEach(() => {
    props = {
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: translate,
      url: { query: {}, route: "/summary" }
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
    props.reduxState = reduxState;
  });

  it("passes axe tests", async () => {
    let html = mount(<Summary {...props} {...reduxState} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("renders page title", async () => {
    let text = mount(<Summary {...props} {...reduxState} />).text();
    expect(text).toContain("ge.summary_subtitle");
  });

  it("the Next buttons says 'Show Results' if the section is the summary", () => {
    expect(
      mount(<Summary {...props} {...reduxState} />)
        .find("Button")
        .last()
        .text()
    ).toContain("ge.show_results");
  });
});

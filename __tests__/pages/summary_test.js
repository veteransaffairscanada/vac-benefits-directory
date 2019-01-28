import { Summary } from "../../pages/summary";
import { mount } from "enzyme";
import React from "react";
import benefitsFixture from "../fixtures/benefits";
import translate from "../fixtures/translate";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";
import benefitEligibilityFixture from "../fixtures/benefitEligibility";
import questionsFixture from "../fixtures/questions";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import multipleChoiceOptions from "../fixtures/multiple_choice_options";
import Router from "next/router";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Summary", () => {
  let props;
  let mockStore, reduxState;
  Router.push = jest.fn().mockImplementation(() => new Promise(() => true));
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
      filteredBenefits: benefitsFixture,
      benefitEligibility: benefitEligibilityFixture,
      needs: needsFixture,
      selectedNeeds: {},
      serviceType: "s1",
      patronType: "veteran",
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

  it("the Next button says 'Show Results'", () => {
    expect(
      mount(<Summary {...props} {...reduxState} />)
        .find("#nextButton")
        .last()
        .text()
    ).toContain("ge.show_results");
  });

  it("the back button goes to the correct page", () => {
    mount(<Summary {...props} {...reduxState} />)
      .find("#prevButton")
      .first()
      .simulate("click");
    expect(Router.push).toBeCalledWith("/needs?");
  });

  it("the next button goes to the correct page", () => {
    mount(<Summary {...props} {...reduxState} />)
      .find("#nextButton")
      .first()
      .simulate("click");
    expect(Router.push).toBeCalledWith("/benefits-directory?");
  });
});

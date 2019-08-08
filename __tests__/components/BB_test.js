/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import configureStore from "redux-mock-store";

import { BB } from "../../components/BB";
import benefitsFixture from "../fixtures/benefits";
import benefitEligibilityFixture from "../fixtures/benefitEligibility";
import needsFixture from "../fixtures/needs";
import questionsFixture from "../fixtures/questions";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import questionClearLogicFixture from "../fixtures/question_clear_logic";
import nextStepsFixture from "../fixtures/nextSteps";
import translateFixture from "../fixtures/translate";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
import benefitExamplesFixture from "../fixtures/benefitExamples";

jest.mock("react-ga");
window.matchMedia = () => ({
  addListener: () => {},
  removeListener: () => {}
});
describe("BB", () => {
  let props;
  let _mountedBB;
  let _shallowBB;
  let mockStore, reduxData;

  const mounted_BB = () => {
    if (!_mountedBB) {
      _mountedBB = mount(<BB {...props} {...reduxData} />);
    }
    return _mountedBB;
  };

  const shallow_BB = () => {
    if (!_shallowBB) {
      _shallowBB = shallow(<BB {...props} {...reduxData} />);
    }
    return _shallowBB;
  };

  beforeEach(() => {
    props = {
      t: translateFixture,
      clearFilters: () => true,
      clearNeeds: () => true,
      id: "BB",
      filteredBenefits: [],
      setSelectedNeeds: () => true,
      favouriteBenefits: [],
      saveFavourites: jest.fn(),
      url: { query: {} },
      printUrl: "/print",
      summaryUrl: "/summary"
    };
    _shallowBB = undefined;
    _mountedBB = undefined;
    reduxData = {
      nextSteps: nextStepsFixture,
      benefitExamples: benefitExamplesFixture,
      cookiesDisabled: false,
      setCookiesDisabled: jest.fn(),
      saveFavourites: jest.fn(),
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionClearLogicFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      benefits: benefitsFixture,
      favouriteBenefits: [],
      benefitEligibility: benefitEligibilityFixture,
      filteredBenefits: benefitsFixture,
      needs: needsFixture,
      serviceType: "",
      patronType: "",
      searchString: "",
      statusAndVitals: "",
      selectedEligibility: {
        serviceType: "",
        patronType: "",
        statusAndVitals: ""
      },
      serviceHealthIssue: "",
      setSearchString: jest.fn(),
      selectedNeeds: {},
      option: ""
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mounted_BB().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains a BenefitsPane", async () => {
    expect(shallow_BB().find("#BenefitsPane").length).not.toEqual(0);
  });

  it("has a Clear Filters button", () => {
    expect(shallow_BB().find("#ClearEligibilityFilters"));
  });

  it("contains BreadCrumbs", async () => {
    expect(shallow_BB().find("BreadCrumbs").length).toEqual(1);
  });
});

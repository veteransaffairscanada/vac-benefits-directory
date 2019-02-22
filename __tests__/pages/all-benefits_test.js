/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";

import { AllBenefits } from "../../pages/all-benefits";
import benefitsFixture from "../fixtures/benefits";
import benefitEligibilityFixture from "../fixtures/benefitEligibility";
import needsFixture from "../fixtures/needs";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import translate from "../fixtures/translate";
import configureStore from "redux-mock-store";
import benefitExamplesFixture from "../fixtures/benefitExamples";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import questionClearLogicFixture from "../fixtures/question_clear_logic";
import nextStepsFixture from "../fixtures/nextSteps";
import questionsFixture from "../fixtures/questions";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("AllBenefits", () => {
  let props;
  let _mountedAllBenefits;
  let mockStore, reduxData;

  const mountedAllBenefits = () => {
    if (!_mountedAllBenefits) {
      _mountedAllBenefits = mount(<AllBenefits {...props} {...reduxData} />);
    }
    return _mountedAllBenefits;
  };

  beforeEach(() => {
    props = {
      translations: [],
      i18n: {
        addResourceBundle: jest.fn()
      },
      storeHydrated: true,
      loadDataStore: jest.fn(),
      favouriteBenefits: [],
      showFavourites: true,
      toggleFavourite: () => true,
      url: { query: {} }
    };
    _mountedAllBenefits = undefined;
    mockStore = configureStore();
    reduxData = {
      t: translate,
      nextSteps: nextStepsFixture,
      benefitExamples: benefitExamplesFixture,
      cookiesDisabled: false,
      setCookiesDisabled: jest.fn(),
      profileQuestions: questionsFixture.filter(
        q => q.variable_name !== "needs"
      ),
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
      saveQuestionResponse: jest.fn(),
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
      option: "",
      pageWidth: 1000
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mountedAllBenefits().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows the list of all benefits available", () => {
    mountedAllBenefits()
      .find("BenefitCard")
      .map((bc, i) => {
        expect(bc.props().benefit.vac_name_en).toEqual(
          benefitsFixture[i].vac_name_en
        );
      });
  });
});

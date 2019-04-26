import React from "react";
import { mount, shallow } from "enzyme";
import { BenefitList } from "../../components/benefit_list";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

import benefitsFixture from "../fixtures/benefits";
import benefitExamplesFixture from "../fixtures/benefitExamples";
import benefitEligibilityFixture from "../fixtures/benefitEligibility";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import configureStore from "redux-mock-store";
import needsFixture from "../fixtures/needs";
import translateFixture from "../fixtures/translate";
import nextStepsFixture from "../fixtures/nextSteps";
import questionsFixture from "../fixtures/questions";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import questionClearLogicFixture from "../fixtures/question_clear_logic";

describe("BenefitList", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      filteredBenefits: benefitsFixture,
      onRef: k => k,
      savedList: true,
      currentLanguage: "en"
    };

    mockStore = configureStore();
    reduxData = {
      t: translateFixture,
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
      option: ""
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(<BenefitList {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a correct cleanSortingPriority function", () => {
    let BLInstance = shallow(
      <BenefitList {...props} {...reduxData} />
    ).instance();
    expect(BLInstance.cleanSortingPriority("high")).toEqual("high");
    expect(BLInstance.cleanSortingPriority("medium")).toEqual("medium");
    expect(BLInstance.cleanSortingPriority("low")).toEqual("low");
    expect(BLInstance.cleanSortingPriority("bad value")).toEqual("low");
    expect(BLInstance.cleanSortingPriority(undefined)).toEqual("low");
  });

  it("has a correct sortBenefits function", () => {
    let BLInstance = shallow(
      <BenefitList {...props} {...reduxData} />
    ).instance();
    expect(BLInstance.sortBenefits(benefitsFixture).map(b => b.id)).toEqual([
      "benefit_2",
      "benefit_1",
      "benefit_0",
      "benefit_3",
      "benefit_4"
    ]);
  });

  it("displays the correct number of benefits cards", () => {
    expect(
      mount(<BenefitList {...props} {...reduxData} />).find("BenefitCard")
        .length
    ).toEqual(5);
  });
  it("shows a loading circle when the page is loading", () => {
    let mounted = mount(<BenefitList {...props} {...reduxData} />);
    mounted.setState({ loading: true });
    expect(mounted.find("CircularProgress").length).toEqual(1);
  });
});

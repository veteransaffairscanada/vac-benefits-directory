import React from "react";
import { mount } from "enzyme";
import { GuidedExperienceSummary } from "../../components/guided_experience_summary";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
import benefitsFixture from "../fixtures/benefits";
import translate from "../fixtures/translate";
import needsFixture from "../fixtures/needs";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import benefitEligibilityFixture from "../fixtures/benefitEligibility";
import questionsFixture from "../fixtures/questions";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import multipleChoiceOptions from "../fixtures/multiple_choice_options";

describe("GuidedExperienceSummary", () => {
  let props, reduxState;
  beforeEach(() => {
    props = {
      t: translate,
      url: { query: {}, route: "/summary" }
    };
    reduxState = {
      benefits: benefitsFixture,
      filteredBenefits: benefitsFixture,
      eligibilityPaths: eligibilityPathsFixture,
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
    props.reduxState = reduxState;
  });

  it("passes axe tests", async () => {
    let html = mount(<GuidedExperienceSummary {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("renders the correct number of li elements", async () => {
    expect(
      mount(<GuidedExperienceSummary {...props} />).find("li").length
    ).toEqual(3);
  });

  it("renders the correct number of breadcrumbs", async () => {
    expect(
      mount(<GuidedExperienceSummary {...props} />).find("AnchorLink").length
    ).toEqual(5);
  });

  it("clicking a breadcrumb takes you to the correct url", async () => {
    expect(
      mount(<GuidedExperienceSummary {...props} />)
        .find("AnchorLink")
        .first()
        .prop("href")
    ).toEqual("/index?section=patronType");
  });
});

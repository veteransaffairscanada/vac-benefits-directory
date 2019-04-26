import React from "react";
import { mount } from "enzyme";
import { SummaryRow } from "../../components/summary_row";
import benefitsFixture from "../fixtures/benefits";
import translate from "../fixtures/translate";
import needsFixture from "../fixtures/needs";
import benefitEligibilityFixture from "../fixtures/benefitEligibility";
import questionsFixture from "../fixtures/questions";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import multipleChoiceOptions from "../fixtures/multiple_choice_options";

describe("GuidedExperienceSummary", () => {
  let props, reduxState;
  beforeEach(() => {
    props = {
      t: translate,
      url: { query: {}, route: "/summary" },
      questionName: "patronType",
      key: 0
    };
    reduxState = {
      benefits: benefitsFixture,
      filteredBenefits: benefitsFixture,
      benefitEligibility: benefitEligibilityFixture,
      needs: needsFixture,
      selectedNeeds: { need_0: "need_0", need_1: "need_1" },
      patronType: "veteran",
      option: "",
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionDisplayLogicFixture,
      multipleChoiceOptions: multipleChoiceOptions
    };
    props.reduxState = reduxState;
  });

  // not doing axe testing on this component because it contains an unavoidable
  // violation: <li> elements not in a <ul> because the <ul> is in the parent
  // component.

  it("renders an edit button", async () => {
    expect(
      mount(<SummaryRow {...props} />)
        .find("HeaderLink")
        .text()
    ).toEqual("ge.edit");
  });

  it("clicking an edit link takes you to the correct url", async () => {
    expect(
      mount(<SummaryRow {...props} />)
        .find("HeaderLink")
        .prop("href")
    ).toEqual("/?");
  });

  it("contains a comma separated list if there are selected needs", async () => {
    props.questionName = "needs";
    expect(
      mount(<SummaryRow {...props} />)
        .find("div")
        .at(1)
        .text()
    ).toEqual("Need 0, Need 1");
  });

  it("contains the user's answer", async () => {
    expect(
      mount(<SummaryRow {...props} />)
        .find("div")
        .at(1)
        .text()
    ).toEqual("p1_en");
  });

  it("contains 'not selected' if nothing is selected", async () => {
    props.reduxState.patronType = "";
    expect(
      mount(<SummaryRow {...props} />)
        .find("div")
        .at(1)
        .text()
    ).toEqual("ge.nothing_selected");
  });
});

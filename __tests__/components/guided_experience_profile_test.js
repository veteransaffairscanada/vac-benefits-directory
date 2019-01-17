/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";
import configureStore from "redux-mock-store";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import benefitEligibilityFixture from "../fixtures/benefitEligibility";
import questionsFixture from "../fixtures/questions";
import translateFixture from "../fixtures/translate";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import { GuidedExperienceProfile } from "../../components/guided_experience_profile";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("GuidedExperienceProfile", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      t: translateFixture,
      options: ["mco_p1", "mco_p2"],
      selectorType: "patronType"
    };
    reduxData = {
      serviceType: "",
      patronType: "",
      statusAndVitals: "",
      serviceHealthIssue: "",
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      eligibilityPaths: eligibilityPathsFixture,
      benefitEligibility: benefitEligibilityFixture,
      questions: questionsFixture,
      questionDisplayLogic: [],
      questionClearLogic: []
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(
      <GuidedExperienceProfile {...props} {...reduxData} />
    ).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains all the options", () => {
    expect(
      mount(<GuidedExperienceProfile {...props} {...reduxData} />)
        .find("#RadioSelectorpatronType")
        .find("Radio").length
    ).toEqual(2);
  });
});

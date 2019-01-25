import { mount } from "enzyme";
import React from "react";
import Router from "next/router";
import questionsFixture from "../fixtures/questions_complex";
import benefitEligibilityFixture from "../fixtures/benefitEligibility_complex";
import needsFixture from "../fixtures/needs";
import { GuidedExperiencePage } from "../../components/guided_experience_page";
const { axe, toHaveNoViolations } = require("jest-axe");
import translate from "../fixtures/translate";
import multipleChoiceOptions from "../fixtures/multiple_choice_options_complex";
import configureStore from "redux-mock-store";

expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("GuidedExperiencePage", () => {
  let props, reduxState, mockStore;

  Router.push = jest.fn().mockImplementation(() => new Promise(() => true));
  beforeEach(() => {
    props = {
      t: translate,
      section: "patronType",
      url: {
        query: { lng: "en", patronType: "veteran", serviceType: "RCMP" },
        route: "/"
      },
      i18n: {
        addResourceBundle: jest.fn()
      }
    };
    reduxState = {
      patronType: "veteran",
      serviceType: "RCMP",
      statusAndVitals: "",
      serviceHealthIssue: "",
      selectedNeeds: {},
      needs: needsFixture,
      questions: questionsFixture,
      multipleChoiceOptions: multipleChoiceOptions,
      benefitEligibility: benefitEligibilityFixture,
      questionDisplayLogic: [],
      questionClearLogic: []
    };
    props.reduxState = reduxState;
    mockStore = configureStore();
    props.store = mockStore(reduxState);
  });

  it("passes axe tests", async () => {
    let html = mount(
      <GuidedExperiencePage {...props} {...reduxState} />
    ).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("layout is rendered", async () => {
    expect(
      mount(<GuidedExperiencePage {...props} {...reduxState} />).find("Layout")
        .length
    ).toEqual(1);
  });

  it("GuidedExperience is rendered", async () => {
    expect(
      mount(<GuidedExperiencePage {...props} {...reduxState} />).find(
        "GuidedExperience"
      ).length
    ).toEqual(1);
  });

  it("if section if patronType, GuidedExperienceProfile is rendered and GuidedExperienceNeeds is not", async () => {
    const mounted = mount(<GuidedExperiencePage {...props} {...reduxState} />);
    expect(mounted.find("GuidedExperienceProfile").length).toEqual(1);
    expect(mounted.find("GuidedExperienceNeeds").length).toEqual(0);
  });

  it("if section if needs, GuidedExperienceNeeds is rendered and GuidedExperienceProfile is not", async () => {
    props.section = "needs";
    const mounted = mount(<GuidedExperiencePage {...props} {...reduxState} />);
    expect(mounted.find("GuidedExperienceNeeds").length).toEqual(1);
    expect(mounted.find("GuidedExperienceProfile").length).toEqual(0);
  });
});

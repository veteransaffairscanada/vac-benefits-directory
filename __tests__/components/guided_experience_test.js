import { mount, shallow } from "enzyme";
import React from "react";
import { GuidedExperience } from "../../components/guided_experience";
const { axe, toHaveNoViolations } = require("jest-axe");
import translate from "../fixtures/translate";
import fs from "fs";
const data = JSON.parse(fs.readFileSync("data/data.json"));

expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("GuidedExperience", () => {
  let props;
  let _mountedGuidedExperience;
  let _shallowGuidedExperience;

  const mounted_GuidedExperience = () => {
    if (!_mountedGuidedExperience) {
      _mountedGuidedExperience = mount(<GuidedExperience {...props} />);
    }
    return _mountedGuidedExperience;
  };

  const shallow_GuidedExperience = () => {
    if (!_shallowGuidedExperience) {
      _shallowGuidedExperience = shallow(<GuidedExperience {...props} />);
    }
    return _shallowGuidedExperience;
  };

  beforeEach(() => {
    props = {
      t: translate,
      id: "serviceType",
      prevSection: "patronType",
      stepNumber: 1,
      children: <div className="thing" />,
      subtitle: "subtitle",
      url: {
        query: { lng: "en", patronType: "veteran", serviceType: "RCMP" },
        route: "/summary"
      },
      saveQuestionResponse: jest.fn(),
      sectionOrder: data.questions.map(x => x.variable_name),
      reduxState: {
        patronType: "veteran",
        serviceType: "RCMP",
        statusAndVitals: "",
        serviceHealthIssue: "",
        selectedNeeds: {},
        questions: data.questions,
        multipleChoiceOptions: data.multipleChoiceOptions,
        benefitEligibility: data.benefitEligibility
      }
    };
    _shallowGuidedExperience = undefined;
    _mountedGuidedExperience = undefined;
  });

  it("passes axe tests", async () => {
    let html = mounted_GuidedExperience().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("renders children", () => {
    expect(shallow_GuidedExperience().find(".thing").length).toEqual(1);
  });

  it("the Next buttons says 'Next'", () => {
    expect(
      mounted_GuidedExperience()
        .find("#nextButton")
        .first()
        .text()
    ).toContain("next");
  });

  it("displays helper text if id is serviceHealthIssue", () => {
    props.id = "serviceHealthIssue";
    expect(mounted_GuidedExperience().find("Body").length).toEqual(1);
  });

  it("does not display helper text if id is not serviceHealthIssue", () => {
    expect(mounted_GuidedExperience().find("Body").length).toEqual(0);
  });

  it("Intro text appears if id is patronType", () => {
    props.id = "patronType";
    expect(mounted_GuidedExperience().text()).toContain("ge.intro_text_p1");
    expect(mounted_GuidedExperience().text()).toContain("ge.intro_text_p2");
  });

  it("Intro text appears does not appear if id is not patronType", () => {
    props.id = "serviceType";
    expect(mounted_GuidedExperience().text()).not.toContain("ge.intro_text_p1");
    expect(mounted_GuidedExperience().text()).not.toContain("ge.intro_text_p2");
  });

  it("back button has correct href, clears hidden questions", () => {
    props.url.query.statusAndVitals = "blah";
    props.url.query.selectedNeeds = "1,2";
    expect(
      mounted_GuidedExperience()
        .find("#prevButton")
        .first()
        .props().href
    ).toEqual("/?lng=en&patronType=veteran&serviceType=RCMP&selectedNeeds=1,2");
  });

  it("back button links to VAC home page if we're on the 1st page", () => {
    props.id = "patronType";
    expect(
      mounted_GuidedExperience()
        .find("#prevButton")
        .first()
        .props().href
    ).toEqual("ge.home_link");
  });

  it("next button has correct href, clears hidden questions", () => {
    props.url.query.statusAndVitals = "blah";
    expect(
      mounted_GuidedExperience()
        .find("#nextLink")
        .first()
        .props().href
    ).toEqual("/serviceHealthIssue?lng=en&patronType=veteran&serviceType=RCMP");
  });

  it("skip button has the correct href, clears hidden questions and current question", () => {
    props.url.query.statusAndVitals = "blah";
    props.url.query.selectedNeeds = "1,2";
    expect(
      mounted_GuidedExperience()
        .find("#skipLink")
        .first()
        .props().href
    ).toEqual("/needs?lng=en&patronType=veteran&selectedNeeds=1,2");
  });

  it("skip button has the correct href, clears future questions", () => {
    props.url.query.patronType = "veteran";
    props.url.query.serviceType = "CAF";
    props.url.query.serviceHealthIssue = "false";
    props.url.query.selectedNeeds = "1,2";
    props.id = "patronType";

    expect(
      mounted_GuidedExperience()
        .find("#skipLink")
        .first()
        .props().href
    ).toEqual("/needs?lng=en&selectedNeeds=1,2");
  });
});

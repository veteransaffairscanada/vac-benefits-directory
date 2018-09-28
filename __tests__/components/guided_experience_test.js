import { mount, shallow } from "enzyme";
import React from "react";
import Router from "next/router";
import questionsFixture from "../fixtures/questions";
import { GuidedExperience } from "../../components/guided_experience";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("GuidedExperience", () => {
  Router.push = jest.fn();
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
      t: key => key,
      setSection: jest.fn(),
      id: "YY",
      nextSection: "ZZ",
      prevSection: "XX",
      stepNumber: 1,
      children: <div className="thing" />,
      subtitle: "subtitle",
      reduxState: {
        patronType: "family",
        serviceType: "rcmp",
        statusAndVitals: "still-serving",
        serviceHealthIssue: "",
        selectedNeeds: {},
        questions: questionsFixture
      }
    };
    _shallowGuidedExperience = undefined;
    _mountedGuidedExperience = undefined;
  });

  it("passes axe tests", async () => {
    let html = mounted_GuidedExperience().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("calls setSection if the Next button is pressed", () => {
    mounted_GuidedExperience()
      .find("Button")
      .last()
      .simulate("click");
    expect(props.setSection).toBeCalledWith("ZZ");
  });

  it("calls setSection if the Back button is pressed", () => {
    mounted_GuidedExperience()
      .find("#prevButton")
      .first()
      .simulate("click");
    expect(props.setSection).toBeCalledWith("XX");
  });

  it("renders children", () => {
    expect(shallow_GuidedExperience().find(".thing").length).toEqual(1);
  });

  it("has edit answer buttons with correct text", () => {
    expect(document.getElementById("jumpButton2").textContent).toEqual(
      "still-serving"
    );
  });

  it("sets the correct section if the edit answer button is pressed", () => {
    mounted_GuidedExperience()
      .find("GuidedExperienceLink")
      .first()
      .simulate("click");
    expect(props.setSection).toBeCalledWith("patronType");
  });

  it("the Next button does not contain an href if nextSection != benefits-directory", () => {
    props.nextSection = "serviceType";
    expect(
      mounted_GuidedExperience()
        .find("Button")
        .last()
        .props().href
    ).toEqual(undefined);
  });

  it("the Next button contains an appropriate href if nextSection == benefits-directory", () => {
    props.nextSection = "benefits-directory";
    mounted_GuidedExperience()
      .find("Button")
      .last()
      .simulate("click");
    expect(Router.push).toBeCalledWith(
      "/benefits-directory?lng=current-language-code&patronType=family&serviceType=rcmp&statusAndVitals=still-serving"
    );
  });

  it("the Next buttons says 'Next' if the section is not needs", () => {
    expect(
      mounted_GuidedExperience()
        .find("Button")
        .last()
        .text()
    ).toContain("next");
  });

  it("the Next buttons says 'Show Results' if the section is the needs", () => {
    props.id = "needs";
    expect(
      mounted_GuidedExperience()
        .find("Button")
        .last()
        .text()
    ).toContain("ge.show_results");
  });
});

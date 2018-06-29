import React from "react";
import { mount, shallow } from "enzyme";
import { RadioSelector } from "../../components/radio_selector";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("RadioSelector", () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {},
      legend: "",
      setPatronType: jest.fn(),
      setServiceType: jest.fn(),
      setStatusAndVitals: jest.fn(),
      options: ["releasedAlive", "stillServing", "deceased"],
      selectorType: "statusAndVitals",
      selectedPatronType: "",
      selectedServiceType: "",
      selectedStatusAndVitals: "releasedAlive",
      t: key => key,
      eligibilityPaths: eligibilityPathsFixture
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<RadioSelector {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has 3 FormControlLabels", () => {
    expect(
      mount(<RadioSelector {...props} />).find("FormControlLabel").length
    ).toEqual(3);
  });

  it("2nd FormControlLabel has the correct text", () => {
    expect(
      mount(<RadioSelector {...props} />)
        .find("FormControlLabel")
        .at(1)
        .text()
    ).toEqual("stillServing");
  });

  it("isDisabled returns false if we don't hit a condition", () => {
    const isDisabled = shallow(<RadioSelector {...props} />).instance()
      .isDisabled;
    expect(isDisabled("a", "a", "")).toEqual(false);
  });

  it("isDisabled returns true if we do hit a condition", () => {
    const isDisabled = shallow(<RadioSelector {...props} />).instance()
      .isDisabled;

    expect(isDisabled("deceased", "service-person", "")).toEqual(true);
    expect(isDisabled("stillServing", "", "WSV (WWII or Korea)")).toEqual(true);
  });

  it("handleSelect calls setUserProfile", () => {
    let instance = shallow(<RadioSelector {...props} />).instance();
    instance.setUserProfile = jest.fn();
    instance.handleSelect({ target: { value: "x" } });
    expect(instance.setUserProfile).toBeCalledWith("statusAndVitals", "x");
  });

  it("setUserProfile logs an analytics event", () => {
    let instance = shallow(<RadioSelector {...props} />).instance();
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    instance.setUserProfile("serviceType", "x");
    expect(analytics.logEvent).toBeCalledWith(
      "FilterClick",
      "serviceType",
      "x"
    );
  });

  it("setUserProfile clears other filters if Organization is selected", () => {
    let instance = shallow(<RadioSelector {...props} />).instance();
    instance.setUserProfile("patronType", "organization");
    expect(props.setServiceType).toBeCalledWith("");
    expect(props.setStatusAndVitals).toBeCalledWith("");
  });
});

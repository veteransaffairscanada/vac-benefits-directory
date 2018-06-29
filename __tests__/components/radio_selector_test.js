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
      setPatronType: x => x,
      setServiceType: x => x,
      setStatusAndVitals: x => x,
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

  // it("toggleSelectedEligibility adds and removes id", () => {
  //   let AInstance = mountedA().instance();
  //   AInstance.toggleSelectedEligibility("patronType", "x")();
  //   expect(AInstance.props.setPatronType).toBeCalledWith("x");
  //   AInstance.toggleSelectedEligibility("serviceType", "x")();
  //   expect(AInstance.props.setServiceType).toBeCalledWith("x");
  //   AInstance.toggleSelectedEligibility("statusAndVitals", "x")();
  //   expect(AInstance.props.setStatusType).toBeCalledWith("x");
  // });
  //
  // it("setUserProfile logs an analytics event", () => {
  //   let AInstance = mountedA().instance();
  //   let analytics = require("../../utils/analytics");
  //   analytics.logEvent = jest.fn();
  //   AInstance.setUserProfile("serviceType", "x");
  //   expect(analytics.logEvent).toBeCalledWith(
  //     "FilterClick",
  //     "serviceType",
  //     "x"
  //   );
  // });
  //
  // it("setUserProfile clears other filters if Organization is selected", () => {
  //   let AInstance = mountedA().instance();
  //   AInstance.setUserProfile("patronType", "organization");
  //   expect(AInstance.props.setServiceType).toBeCalledWith("");
  //   expect(AInstance.props.setStatusType).toBeCalledWith("");
  // });

  // it("has the correct button down", () => {
  //   expect(
  //     shallow(<RadioSelector {...props} />)
  //       .find("#RadioSelector")
  //       .props().selectedFilter
  //   ).toEqual("op0");
  // });
});

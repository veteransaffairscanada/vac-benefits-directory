import React from "react";
import { mount } from "enzyme";
import ProfileSelector from "../../components/profile_selector";
// import profileFixture from "../fixtures/needs";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("ProfileSelector", () => {
  let props;
  let _mountedProfileSelector;

  const mountedProfileSelector = () => {
    if (!_mountedProfileSelector) {
      _mountedProfileSelector = mount(<ProfileSelector {...props} />);
    }
    return _mountedProfileSelector;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      clearFilters: key => key,
      setUserProfile: key => key,
      eligibilityPaths: eligibilityPathsFixture,
      selectedEligibility: {
        patronType: "",
        serviceType: "",
        statusAndVitals: ""
      },
      pageWidth: 1000
    };
    _mountedProfileSelector = undefined;
  });

  it("passes axe tests", async () => {
    let html = mountedProfileSelector().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a patronType filter", () => {
    expect(
      mountedProfileSelector()
        .find("#patronTypeFilter")
        .first().length
    ).toEqual(1);
  });

  it("does not have a serviceTypes filter by default", () => {
    expect(
      mountedProfileSelector()
        .find("#serviceTypeFilter")
        .first().length
    ).toEqual(0);
  });

  it("has a serviceTypes filter if a patronType is selected other than organization", () => {
    mountedProfileSelector().setProps({
      selectedEligibility: {
        patronType: "foo",
        serviceType: "",
        statusAndVitals: ""
      }
    });
    expect(
      mountedProfileSelector()
        .find("#serviceTypeFilter")
        .first().length
    ).toEqual(1);
  });

  it("has no serviceTypes filter if patronType is organization", () => {
    mountedProfileSelector().setProps({
      selectedEligibility: {
        patronType: "organization",
        serviceType: "",
        statusAndVitals: ""
      }
    });
    expect(
      mountedProfileSelector()
        .find("#serviceTypeFilter")
        .first().length
    ).toEqual(0);
  });

  it("does not have a statusAndVitals filter by default", () => {
    expect(
      mountedProfileSelector()
        .find("#statusAndVitalsFilter")
        .first().length
    ).toEqual(0);
  });

  it("has a statusAndVitalsFilter filter if a serviceType is selected other than organization", () => {
    mountedProfileSelector().setProps({
      selectedEligibility: {
        patronType: "foo",
        serviceType: "bar",
        statusAndVitals: ""
      }
    });
    expect(
      mountedProfileSelector()
        .find("#statusAndVitalsFilter")
        .first().length
    ).toEqual(1);
  });

  it("has no statusAndVitalsFilter filter if patronType is organization", () => {
    mountedProfileSelector().setProps({
      selectedEligibility: {
        patronType: "organization",
        serviceType: "",
        statusAndVitals: ""
      }
    });
    expect(
      mountedProfileSelector()
        .find("#statusAndVitalsFilter")
        .first().length
    ).toEqual(0);
  });

  it("has the correct radio button text", () => {
    const text = mountedProfileSelector()
      .find("#patronTypeFilter")
      .first()
      .find("FormControlLabel")
      .first()
      .text();
    expect(text).toEqual("service-person");
  });

  it("is expanded if pageWidth > 600px", () => {
    expect(
      mountedProfileSelector()
        .find("ExpansionPanel")
        .prop("expanded")
    ).toEqual(true);
  });

  it("is not expanded if pageWidth < 600px", () => {
    props.pageWidth = 100;
    expect(
      mountedProfileSelector()
        .find("ExpansionPanel")
        .prop("expanded")
    ).toEqual(false);
  });
});

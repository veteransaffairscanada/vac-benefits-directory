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
      selectedEligibility: {},
      pageWidth: 1000
    };
    _mountedProfileSelector = undefined;
  });

  it("passes axe tests", async () => {
    let html = mountedProfileSelector().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a serviceTypes filter", () => {
    expect(
      mountedProfileSelector()
        .find("#serviceTypeFilter")
        .first().length
    ).toEqual(1);
  });
  it("has a patronType filter", () => {
    expect(
      mountedProfileSelector()
        .find("#patronTypeFilter")
        .first().length
    ).toEqual(1);
  });

  it("has a statusAndVitals filter", () => {
    expect(
      mountedProfileSelector()
        .find("#statusAndVitalsFilter")
        .first().length
    ).toEqual(1);
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

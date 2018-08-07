import React from "react";
import { mount } from "enzyme";
import { ProfileSelector } from "../../components/profile_selector";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
import configureStore from "redux-mock-store";

describe("ProfileSelector", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      t: key => key,
      pageWidth: 1000,
      classes: {},
      theme: {}
    };
    reduxData = {
      eligibilityPaths: eligibilityPathsFixture,
      serviceType: "",
      patronType: "",
      serviceHealthIssue: "",
      setPatronType: jest.fn(),
      setServiceType: jest.fn(),
      setStatusAndVitals: jest.fn(),
      setServiceHealthIssue: jest.fn(),
      statusAndVitals: "",
      showServiceType: true,
      showStatusAndVitals: true,
      showServiceHealthIssue: true
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(<ProfileSelector {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a patronType filter", () => {
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find(".patronTypeFilter")
        .first().length
    ).toEqual(1);
  });

  it("shows each question when showQuestion is true ", () => {
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find(".serviceTypeFilter")
        .first().length
    ).toEqual(1);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find(".statusAndVitalsFilter")
        .first().length
    ).toEqual(1);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find(".serviceHealthIssueFilter")
        .first().length
    ).toEqual(1);
  });

  it("does not show any questions when showQuestion is false", () => {
    reduxData.showServiceType = false;
    reduxData.showStatusAndVitals = false;
    reduxData.showServiceHealthIssue = false;
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find(".serviceTypeFilter")
        .first().length
    ).toEqual(0);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find(".statusAndVitalsFilter")
        .first().length
    ).toEqual(0);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find(".serviceHealthIssueFilter")
        .first().length
    ).toEqual(0);
  });

  it("has the correct radio button text", () => {
    const text = mount(<ProfileSelector {...props} {...reduxData} />)
      .find(".patronTypeFilter")
      .first()
      .find("FormControlLabel")
      .first()
      .text();
    expect(text).toEqual("service-person");
  });
});

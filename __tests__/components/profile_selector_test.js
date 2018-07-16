import React from "react";
import { mount, shallow } from "enzyme";
import { ProfileSelector } from "../../components/profile_selector";
// import profileFixture from "../fixtures/needs";
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
      statusAndVitals: ""
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
        .find("#patronTypeFilter")
        .first().length
    ).toEqual(1);
  });

  it("does not have a serviceTypes filter by default", () => {
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#serviceTypeFilter")
        .first().length
    ).toEqual(0);
  });

  it("has a serviceTypes filter if a patronType is selected other than organization", () => {
    reduxData.patronType = "foo";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#serviceTypeFilter")
        .first().length
    ).toEqual(1);
  });

  it("has no serviceTypes filter if patronType is organization", () => {
    reduxData.patronType = "organization";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#serviceTypeFilter")
        .first().length
    ).toEqual(0);
  });

  it("does not have a statusAndVitals filter by default", () => {
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#statusAndVitalsFilter")
        .first().length
    ).toEqual(0);
  });

  it("has a statusAndVitalsFilter filter if a serviceType is selected other than organization", () => {
    reduxData.patronType = "foo";
    reduxData.serviceType = "bar";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#statusAndVitalsFilter")
        .first().length
    ).toEqual(1);
  });

  it("has no statusAndVitalsFilter filter if patronType is organization", () => {
    reduxData.patronType = "organization";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#statusAndVitalsFilter")
        .first().length
    ).toEqual(0);
  });

  it("has a statusAndVitalsFilter filter if a serviceType is selected other than organization", () => {
    reduxData.patronType = "foo";
    reduxData.serviceType = "bar";
    reduxData.statusAndVitals = "xyz";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#serviceHealthIssueFilter")
        .first().length
    ).toEqual(1);
  });

  it("has no statusAndVitalsFilter filter if patronType is organization", () => {
    reduxData.patronType = "organization";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#serviceHealthIssueFilter")
        .first().length
    ).toEqual(0);
  });

  it("has no clear button if patronType is empty", () => {
    reduxData.patronType = "";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#ClearEligibilityFilters")
        .first().length
    ).toEqual(0);
  });

  it("has a clear button if patronType is populated", () => {
    reduxData.patronType = "organization";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#ClearEligibilityFilters")
        .first().length
    ).toEqual(1);
  });

  it("has the correct radio button text", () => {
    const text = mount(<ProfileSelector {...props} {...reduxData} />)
      .find("#patronTypeFilter")
      .first()
      .find("FormControlLabel")
      .first()
      .text();
    expect(text).toEqual("service-person");
  });

  it("is expanded if pageWidth > 600px", () => {
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("ExpansionPanel")
        .prop("expanded")
    ).toEqual(true);
  });

  it("is not expanded if pageWidth < 600px", () => {
    props.pageWidth = 100;
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("ExpansionPanel")
        .prop("expanded")
    ).toEqual(false);
  });

  it("has a correct clearFilters function", () => {
    let instance = shallow(
      <ProfileSelector {...props} {...reduxData} />
    ).instance();
    instance.clearFilters();
    expect(reduxData.setPatronType).toBeCalledWith("");
    expect(reduxData.setServiceType).toBeCalledWith("");
    expect(reduxData.setStatusAndVitals).toBeCalledWith("");
  });
});

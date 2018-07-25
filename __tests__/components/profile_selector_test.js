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
      selectedPatronType: "",
      selectedServiceType: "",
      selectedStatusAndVitals: "",
      selectedServiceHealthIssue: "",
      selectedNeeds: {},
      serviceHealthIssue: "",
      setPatronType: jest.fn(),
      setServiceType: jest.fn(),
      setStatusAndVitals: jest.fn(),
      setServiceHealthIssue: jest.fn(),
      setSelectedNeeds: jest.fn(),
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
        .find("#patronTypeFilter")
        .first().length
    ).toEqual(1);
  });

  it("shows each question when showQuestion is true ", () => {
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#serviceTypeFilter")
        .first().length
    ).toEqual(1);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#statusAndVitalsFilter")
        .first().length
    ).toEqual(1);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#serviceHealthIssueFilter")
        .first().length
    ).toEqual(1);
  });

  it("shows each question when showQuestion is false ", () => {
    reduxData.showServiceType = false;
    reduxData.showStatusAndVitals = false;
    reduxData.showServiceHealthIssue = false;
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#serviceTypeFilter")
        .first().length
    ).toEqual(0);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#statusAndVitalsFilter")
        .first().length
    ).toEqual(0);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#serviceHealthIssueFilter")
        .first().length
    ).toEqual(0);
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

  it("has a clear button if patronType is populated", () => {
    reduxData.selectedPatronType = "organization";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#ClearFilters")
        .first().length
    ).toEqual(1);
  });

  it("has no clear button if selectedNeeds is empty", () => {
    reduxData.selectedNeeds = {};
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#ClearFilters")
        .first().length
    ).toEqual(0);
  });

  it("has a clear button if selectedNeeds is populated", () => {
    reduxData.selectedNeeds = { foo: "bar" };
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileSelector {...props} {...reduxData} />)
        .find("#ClearFilters")
        .first().length
    ).toEqual(1);
  });

  it("has a correct clearFilters function", () => {
    let instance = mount(
      <ProfileSelector {...props} {...reduxData} />
    ).instance();
    instance.clearFilters();
    expect(reduxData.setPatronType).toBeCalledWith("");
    expect(reduxData.setServiceType).toBeCalledWith("");
    expect(reduxData.setStatusAndVitals).toBeCalledWith("");
    expect(reduxData.setServiceHealthIssue).toBeCalledWith("");
    expect(reduxData.setSelectedNeeds).toBeCalledWith({});
  });

  it("has a correct countSelected function", () => {
    reduxData.selectedNeeds = { foo: "bar" };
    reduxData.selectedServiceType = "fiz";
    reduxData.selectedPatronType = "organization";
    let instance = mount(
      <ProfileSelector {...props} {...reduxData} />
    ).instance();
    expect(instance.countSelected()).toEqual(3);
  });
});

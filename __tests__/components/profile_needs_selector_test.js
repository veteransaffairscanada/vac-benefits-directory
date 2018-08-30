import React from "react";
import { mount } from "enzyme";
import { ProfileNeedsSelector } from "../../components/profile_needs_selector";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";

describe("ProfileNeedsSelector", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      t: key => key,
      classes: {}
    };
    reduxData = {
      patronType: "",
      serviceType: "",
      statusAndVitals: "",
      serviceHealthIssue: "",
      selectedPatronType: "",
      selectedServiceType: "",
      selectedStatusAndVitals: "",
      selectedServiceHealthIssue: "",
      selectedNeeds: {},
      needs: needsFixture,
      setPatronType: jest.fn(),
      setServiceType: jest.fn(),
      setStatusAndVitals: jest.fn(),
      setServiceHealthIssue: jest.fn(),
      setSelectedNeeds: jest.fn(),
      eligibilityPaths: eligibilityPathsFixture,
      showServiceType: true,
      showStatusAndVitals: true,
      showServiceHealthIssue: true,
      pageWidth: 1000
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(<ProfileNeedsSelector {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has no clear button if patronType is empty", () => {
    reduxData.patronType = "";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileNeedsSelector {...props} {...reduxData} />)
        .find("#ClearFilters")
        .first().length
    ).toEqual(0);
  });

  it("has a clear button if patronType is populated", () => {
    reduxData.patronType = "organization";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileNeedsSelector {...props} {...reduxData} />)
        .find("#ClearFilters")
        .first().length
    ).toEqual(1);
  });

  it("has no clear button if selectedNeeds is empty", () => {
    reduxData.selectedNeeds = {};
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileNeedsSelector {...props} {...reduxData} />)
        .find("#ClearFilters")
        .first().length
    ).toEqual(0);
  });

  it("has a clear button if selectedNeeds is populated", () => {
    reduxData.selectedNeeds = { foo: "bar" };
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileNeedsSelector {...props} {...reduxData} />)
        .find("#ClearFilters")
        .first().length
    ).toEqual(1);
  });

  it("has a correct clearFilters function", () => {
    let instance = mount(
      <ProfileNeedsSelector {...props} {...reduxData} />
    ).instance();
    instance.clearFilters();
    expect(reduxData.setPatronType).toBeCalledWith("");
    expect(reduxData.setServiceType).toBeCalledWith("");
    expect(reduxData.setStatusAndVitals).toBeCalledWith("");
    expect(reduxData.setServiceHealthIssue).toBeCalledWith("");
    expect(reduxData.setSelectedNeeds).toBeCalledWith({});
  });

  it("clicking #ClearFilters toggles the clearFilters function", () => {
    reduxData.selectedNeeds = { foo: "bar" };
    const mounted = mount(<ProfileNeedsSelector {...props} {...reduxData} />);
    mounted.instance().clearFilters = jest.fn();
    mounted
      .find("#ClearFilters")
      .first()
      .simulate("click");
    expect(mounted.instance().clearFilters).toBeCalled();
  });

  it("returns 1 if a profile is selected", () => {
    reduxData.selectedPatronType = "organization";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileNeedsSelector {...props} {...reduxData} />)
        .instance()
        .countSelected()
    ).toEqual(1);
  });
});

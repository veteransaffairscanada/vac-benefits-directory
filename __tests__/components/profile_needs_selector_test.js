import React from "react";
import { mount, shallow } from "enzyme";
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
      pageWidth: 1000,
      classes: {}
    };
    reduxData = {
      patronType: "",
      serviceType: "",
      statusAndVitals: "",
      serviceHealthIssue: "",
      selectedNeeds: {},
      needs: needsFixture,
      setPatronType: jest.fn(),
      setServiceType: jest.fn(),
      setStatusAndVitals: jest.fn(),
      setServiceHealthIssue: jest.fn(),
      setSelectedNeeds: jest.fn(),
      eligibilityPaths: eligibilityPathsFixture
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

  it("is expanded if pageWidth > 600px", () => {
    expect(
      mount(<ProfileNeedsSelector {...props} {...reduxData} />)
        .find("ExpansionPanel")
        .prop("expanded")
    ).toEqual(true);
  });

  it("is not expanded if pageWidth < 600px", () => {
    props.pageWidth = 100;
    expect(
      mount(<ProfileNeedsSelector {...props} {...reduxData} />)
        .find("ExpansionPanel")
        .prop("expanded")
    ).toEqual(false);
  });

  it("has a correct clearFilters function", () => {
    let instance = shallow(
      <ProfileNeedsSelector {...props} {...reduxData} />
    ).instance();
    instance.clearFilters();
    expect(reduxData.setPatronType).toBeCalledWith("");
    expect(reduxData.setServiceType).toBeCalledWith("");
    expect(reduxData.setStatusAndVitals).toBeCalledWith("");
    expect(reduxData.setServiceHealthIssue).toBeCalledWith("");
    expect(reduxData.setSelectedNeeds).toBeCalledWith({});
  });
});

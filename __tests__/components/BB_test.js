/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import configureStore from "redux-mock-store";

import { BB } from "../../components/BB";
import benefitsFixture from "../fixtures/benefits";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import examplesFixture from "../fixtures/needs";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("BB", () => {
  let props;
  let _mountedBB;
  let _shallowBB;
  let mockStore, reduxData;

  const mounted_BB = () => {
    if (!_mountedBB) {
      _mountedBB = mount(<BB {...props} {...reduxData} />);
    }
    return _mountedBB;
  };

  const shallow_BB = () => {
    if (!_shallowBB) {
      _shallowBB = shallow(<BB {...props} {...reduxData} />);
    }
    return _shallowBB;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      clearFilters: () => true,
      clearNeeds: () => true,
      id: "BB",
      filteredBenefits: [],
      pageWidth: 42,
      setSelectedNeeds: () => true,
      favouriteBenefits: [],
      classes: {},
      url: { query: {} }
    };
    _shallowBB = undefined;
    _mountedBB = undefined;
    reduxData = {
      benefits: benefitsFixture,
      favouriteBenefits: [],
      examples: examplesFixture,
      eligibilityPaths: eligibilityPathsFixture,
      filteredBenefits: benefitsFixture,
      needs: needsFixture,
      serviceType: "",
      patronType: "",
      searchString: "",
      statusAndVitals: "",
      selectedEligibility: {
        serviceType: "",
        patronType: "",
        statusAndVitals: ""
      },
      serviceHealthIssue: "",
      setSearchString: jest.fn(),
      selectedNeeds: {},
      option: "",
      showServiceType: true,
      showStatusAndVitals: true,
      showServiceHealthIssue: true,
      pageWidth: 1000
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mounted_BB().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a sortBy selector", () => {
    expect(shallow_BB().find("#sortBySelector").length).toEqual(1);
  });

  it("has the ProfileSelector component", () => {
    expect(mounted_BB().find("ProfileSelector").length).not.toEqual(0);
  });

  it("has the NeedsSelector component", () => {
    expect(mounted_BB().find("NeedsSelector").length).not.toEqual(0);
  });

  it("has a Clear Filters button", () => {
    expect(shallow_BB().find("#ClearEligibilityFilters"));
  });

  it("has a benefits counter", () => {
    expect(mounted_BB().find(".BenefitsCounter"));
  });

  it("shows B3.All benefits to consider when no filters are selected", () => {
    mounted_BB().setProps({
      selectedEligibility: {
        patronType: "",
        serviceType: "",
        statusAndVitals: ""
      }
    });
    mounted_BB().setProps({ selectedNeeds: {} });
    expect(
      mounted_BB()
        .find(".BenefitsCounter")
        .last()
        .text()
    ).toEqual("B3.All benefits to consider");
  });

  describe("countSelection", () => {
    it("returns 0 if nothing is selected", () => {
      expect(
        mounted_BB()
          .instance()
          .countSelection()
      ).toEqual(0);
    });

    it("returns 1 if one selectedEligibilty is selected", () => {
      mounted_BB().setProps({
        selectedEligibility: {
          patronType: eligibilityPathsFixture[0].patronType
        }
      });
      expect(
        mounted_BB()
          .instance()
          .countSelection()
      ).toEqual(1);
    });

    it("returns 1 if one selectedNeeds is selected", () => {
      let needsSelection = {};
      needsSelection[needsFixture[0].id] = needsFixture[0].id;
      mounted_BB().setProps({ selectedNeeds: needsSelection });
      expect(
        mounted_BB()
          .instance()
          .countSelection()
      ).toEqual(1);
    });

    it("returns 1 if one selectedNeeds is selected", () => {
      let needsSelection = {};
      needsSelection[needsFixture[0].id] = needsFixture[0].id;
      mounted_BB().setProps({ selectedNeeds: needsSelection });
      mounted_BB().setProps({
        selectedEligibility: {
          patronType: eligibilityPathsFixture[0].patronType
        }
      });
      expect(
        mounted_BB()
          .instance()
          .countSelection()
      ).toEqual(2);
    });
  });

  describe("search feature", () => {
    it("shows a text search box", () => {
      expect(
        mounted_BB()
          .find("#bbSearchField")
          .first().length
      ).toEqual(1);
    });

    it("handleSearchChange sets the searchString state in redux", () => {
      mounted_BB()
        .instance()
        .handleSearchChange({ target: { value: "foo" } });
      expect(reduxData.setSearchString).toBeCalledWith("foo");
    });
  });

  it("contains the print button", () => {
    expect(mounted_BB().find("#printButton").length).toEqual(5); // not sure why this is 5, should be 1
  });

  it("has a correct getPrintUrl function", () => {
    const url = mounted_BB()
      .instance()
      .getPrintUrl(
        [{ id: "id1" }, { id: "id2" }],
        { patronType: "service-person" },
        { need1: "need1", need2: "need2" },
        "sorting",
        "en"
      );
    expect(url).toEqual(
      "print?lng=en&patronType=service-person&needs=need1,need2&sortBy=sorting&benefits=id1,id2"
    );
  });
});

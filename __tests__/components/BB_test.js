/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import configureStore from "redux-mock-store";

import { BB } from "../../components/BB";
import benefitsFixture from "../fixtures/benefits";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import examplesFixture from "../fixtures/needs";
import areaOfficesFixture from "../fixtures/area_offices";
import questionsFixture from "../fixtures/questions";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import questionClearLogicFixture from "../fixtures/question_clear_logic";
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
      setSelectedNeeds: () => true,
      favouriteBenefits: [],
      url: { query: {} }
    };
    _shallowBB = undefined;
    _mountedBB = undefined;
    reduxData = {
      cookiesDisabled: false,
      setCookiesDisabled: jest.fn(),
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionClearLogicFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
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
      setSortBy: jest.fn(),
      selectedNeeds: {},
      sortBy: "relevance",
      option: "",
      pageWidth: 1000,
      areaOffices: areaOfficesFixture,
      selectedAreaOffice: areaOfficesFixture[0],
      closestAreaOffice: areaOfficesFixture[0]
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mounted_BB().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a sortBy selector", () => {
    expect(mounted_BB().find("#sortBySelector").length).toEqual(2);
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

  describe("sort by feature", () => {
    it("shows a sort by box", () => {
      expect(
        mounted_BB()
          .find("#sortBySelector")
          .first().length
      ).toEqual(1);
    });

    it("handleSortByChange sets the sortBy state in redux", () => {
      mounted_BB()
        .instance()
        .handleSortByChange({ target: { value: "foo" } });
      expect(reduxData.setSortBy).toBeCalledWith("foo");
    });
  });

  it("contains the print button", () => {
    expect(mounted_BB().find("#printButton").length).toEqual(1);
  });
});

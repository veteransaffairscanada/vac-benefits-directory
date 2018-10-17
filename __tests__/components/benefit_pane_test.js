/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";
import configureStore from "redux-mock-store";

import { BenefitsPane } from "../../components/benefits_pane";
import benefitsFixture from "../fixtures/benefits";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import questionsFixture from "../fixtures/questions";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("BenefitsPane", () => {
  let props, _mounted, mockStore, reduxData;

  const mounted = () => {
    if (!_mounted) {
      _mounted = mount(<BenefitsPane {...props} {...reduxData} />);
    }
    return _mounted;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      clearFilters: () => true,
      clearNeeds: () => true,
      id: "BenefitsPane",
      setSelectedNeeds: () => true,
      url: { query: {} },
      profileFilters: {
        serviceType: "",
        patronType: "",
        statusAndVitals: ""
      }
    };
    _mounted = undefined;
    reduxData = {
      cookiesDisabled: false,
      setCookiesDisabled: jest.fn(),
      profileQuestions: questionsFixture.filter(
        q => q.variable_name !== "needs"
      ),
      saveQuestionResponse: jest.fn(),
      filteredBenefitsWithoutSearch: [],
      benefits: benefitsFixture,
      favouriteBenefits: [],
      eligibilityPaths: eligibilityPathsFixture,
      filteredBenefits: benefitsFixture,
      needs: needsFixture,
      searchString: "",
      setSearchString: jest.fn(),
      setSortBy: jest.fn(),
      selectedNeeds: {},
      sortBy: "relevance"
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  describe("when filteredBenefitsWithoutSearch is empty", () => {
    beforeEach(() => {
      reduxData.filteredBenefitsWithoutSearch = [];
    });

    it("passes axe tests", async () => {
      let html = mounted().html();
      expect(await axe(html)).toHaveNoViolations();
    });
  });

  describe("when filteredBenefitsWithoutSearch is not empty", () => {
    beforeEach(() => {
      reduxData.filteredBenefitsWithoutSearch = ["stuff"];
    });

    it("passes axe tests", async () => {
      let html = mounted().html();
      expect(await axe(html)).toHaveNoViolations();
    });

    it("has a sortBy selector", () => {
      expect(mounted().find("#sortBySelector").length).toEqual(2);
    });

    it("has a benefits counter", () => {
      expect(mounted().find(".BenefitsCounter"));
    });

    it("shows B3.All benefits to consider when no filters are selected", () => {
      mounted().setProps({
        profileFilters: {
          patronType: "",
          serviceType: "",
          statusAndVitals: ""
        }
      });
      mounted().setProps({ selectedNeeds: {} });
      expect(
        mounted()
          .find(".BenefitsCounter")
          .last()
          .text()
      ).toEqual("B3.All benefits to consider");
    });

    describe("countSelection", () => {
      it("returns 0 if nothing is selected", () => {
        expect(
          mounted()
            .instance()
            .countSelection()
        ).toEqual(0);
      });

      it("returns 1 if one selectedEligibilty is selected", () => {
        mounted().setProps({
          profileFilters: {
            patronType: eligibilityPathsFixture[0].patronType
          }
        });
        expect(
          mounted()
            .instance()
            .countSelection()
        ).toEqual(1);
      });

      it("returns 1 if one selectedNeeds is selected", () => {
        let needsSelection = {};
        needsSelection[needsFixture[0].id] = needsFixture[0].id;
        mounted().setProps({ selectedNeeds: needsSelection });
        expect(
          mounted()
            .instance()
            .countSelection()
        ).toEqual(1);
      });

      it("returns 1 if one selectedNeeds is selected", () => {
        let needsSelection = {};
        needsSelection[needsFixture[0].id] = needsFixture[0].id;
        mounted().setProps({ selectedNeeds: needsSelection });
        mounted().setProps({
          profileFilters: {
            patronType: eligibilityPathsFixture[0].patronType
          }
        });
        expect(
          mounted()
            .instance()
            .countSelection()
        ).toEqual(2);
      });
    });

    describe("search feature", () => {
      it("shows a text search box", () => {
        expect(
          mounted()
            .find("#bbSearchField")
            .first().length
        ).toEqual(1);
      });

      it("handleSearchChange sets the searchString state in redux", () => {
        mounted()
          .instance()
          .handleSearchChange({ target: { value: "foo" } });
        expect(reduxData.setSearchString).toBeCalledWith("foo");
      });
    });

    describe("sort by feature", () => {
      it("shows a sort by box", () => {
        expect(
          mounted()
            .find("#sortBySelector")
            .first().length
        ).toEqual(1);
      });

      it("handleSortByChange sets the sortBy state in redux", () => {
        mounted()
          .instance()
          .handleSortByChange({ target: { value: "foo" } });
        expect(reduxData.setSortBy).toBeCalledWith("foo");
      });
    });
  });
});

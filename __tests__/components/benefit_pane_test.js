/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";
import configureStore from "redux-mock-store";

import { BenefitsPane } from "../../components/benefits_pane";
import benefitsFixture from "../fixtures/benefits";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import questionsFixture from "../fixtures/questions";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import questionClearLogicFixture from "../fixtures/question_clear_logic";

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
      },
      filteredBenefits: [],
      nextStepsRef: React.createRef(),
      favouriteBenefits: []
    };
    _mounted = undefined;
    reduxData = {
      cookiesDisabled: false,
      setCookiesDisabled: jest.fn(),
      profileQuestions: questionsFixture.filter(
        q => q.variable_name !== "needs"
      ),
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionClearLogicFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      benefits: benefitsFixture,
      favouriteBenefits: [],
      eligibilityPaths: eligibilityPathsFixture,
      filteredBenefits: benefitsFixture,
      needs: needsFixture,
      serviceType: "",
      patronType: "",
      saveQuestionResponse: jest.fn(),
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
      pageWidth: 1000
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

      it("returns 1 if one selectedEligibility is selected", () => {
        mounted().setProps({
          profileFilters: {
            patronType: "p1"
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
            patronType: "p1"
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
  });
});

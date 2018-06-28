/* eslint-env jest */

import { shallow } from "enzyme";
import Router from "next/router";

import React from "react";
import { A } from "../../pages/A";
import benefitsFixture from "../fixtures/benefits";
import textFixture from "../fixtures/text";

import elegibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";
import examplesFixture from "../fixtures/examples";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("A", () => {
  Router.router = {
    push: jest.fn()
  };
  Router.push = jest.fn();

  let props;
  let _mountedA;
  let mockStore, reduxData;

  const mountedA = () => {
    if (!_mountedA) {
      _mountedA = shallow(<A {...props} {...reduxData} />);
    }
    return _mountedA;
  };

  beforeEach(() => {
    props = {
      text: [],
      url: {
        query: {}
      },
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: key => {
        return key == "current-language-code" ? "en" : key;
      },
      storeHydrated: true,
      dispatch: jest.fn(),
      benefits: benefitsFixture,
      eligibilityPaths: elegibilityPathsFixture,
      selectedNeeds: {},
      needs: needsFixture,
      examples: [],
      setPatronType: jest.fn(),
      setSelectedNeeds: jest.fn(),
      setServiceType: jest.fn(),
      setStatusType: jest.fn(),
      favouriteBenefits: []
    };
    _mountedA = undefined;
    mockStore = configureStore();
    reduxData = {
      benefits: benefitsFixture,
      examples: examplesFixture,
      eligibilityPaths: eligibilityPathsFixture,
      needs: needsFixture,
      serviceType: "CAF",
      patronType: "family",
      statusAndVitals: ""
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mountedA().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a correct setURL function", () => {
    props.selectedNeeds = { health: "health", financial: "financial" };
    let AInstance = mountedA().instance();
    const state = {
      section: "S"
    };
    const expectedURL =
      "/A?section=S&selectedNeeds=health,financial&patronType=family&serviceType=CAF&lng=en";
    AInstance.setState(state);
    AInstance.setURL(state);
    expect(Router.push).toBeCalledWith(expectedURL);
  });

  it("has a correct clearFilters function", () => {
    let AInstance = mountedA().instance();
    AInstance.clearFilters();
    expect(AInstance.props.setPatronType).toBeCalledWith("");
    expect(AInstance.props.setServiceType).toBeCalledWith("");
    expect(AInstance.props.setStatusType).toBeCalledWith("");
  });

  it("has a correct clearNeeds function", () => {
    let AInstance = mountedA().instance();
    AInstance.clearNeeds();
    expect(AInstance.props.setSelectedNeeds).toBeCalledWith({});
  });

  it("componentWillMount sets state correctly from empty url", () => {
    expect(mountedA().state().section).toEqual("BB");
  });

  it("toggleSelectedEligibility adds and removes id", () => {
    let AInstance = mountedA().instance();
    AInstance.toggleSelectedEligibility("patronType", "x")();
    expect(AInstance.props.setPatronType).toBeCalledWith("x");
    AInstance.toggleSelectedEligibility("serviceType", "x")();
    expect(AInstance.props.setServiceType).toBeCalledWith("x");
    AInstance.toggleSelectedEligibility("statusAndVitals", "x")();
    expect(AInstance.props.setStatusType).toBeCalledWith("x");
  });

  it("setSelectedNeeds logs an analytics event", () => {
    let AInstance = mountedA().instance();
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    AInstance.setSelectedNeeds(["foo"]);
    expect(analytics.logEvent).toBeCalledWith("FilterClick", "need", "foo");
  });

  it("setUserProfile logs an analytics event", () => {
    let AInstance = mountedA().instance();
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    AInstance.setUserProfile("serviceType", "x");
    expect(analytics.logEvent).toBeCalledWith(
      "FilterClick",
      "serviceType",
      "x"
    );
  });

  it("setUserProfile clears other filters if Organization is selected", () => {
    let AInstance = mountedA().instance();
    AInstance.setUserProfile("patronType", "organization");
    expect(AInstance.props.setServiceType).toBeCalledWith("");
    expect(AInstance.props.setStatusType).toBeCalledWith("");
  });

  it("sectionToDisplay returns appropriate component", () => {
    let AInstance = mountedA().instance();
    expect(AInstance.sectionToDisplay("BB").props.id).toEqual("BB");
  });

  it("componantDidMount hydrates Redux with fixtures if use_testdata set", () => {
    props.url = {
      query: {
        use_testdata: "true"
      }
    };
    const expectedArgs = {
      benefits: benefitsFixture,
      text: textFixture
    };
    expect(mountedA().instance().props.dispatch).toBeCalledWith({
      type: "LOAD_DATA",
      data: expectedArgs
    });
  });
});

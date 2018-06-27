/* eslint-env jest */

import { shallow } from "enzyme";
import Router from "next/router";

import React from "react";
import { A } from "../../pages/A";
import benefitsFixture from "../fixtures/benefits";
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
      url: {
        query: {}
      },
      i18n: {},
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
      selectedEligibility: {
        serviceType: "",
        patronType: "",
        statusAndVitals: ""
      },
      favouriteBenefits: []
    };
    _mountedA = undefined;
    mockStore = configureStore();
    reduxData = {
      benefits: benefitsFixture,
      examples: examplesFixture,
      eligibilityPaths: eligibilityPathsFixture,
      needs: needsFixture
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mountedA().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a correct stringToMap function", () => {
    let AInstance = mountedA().instance();
    expect(AInstance.stringToMap("a,cc")).toEqual({ a: "a", cc: "cc" });
  });

  it("has a correct setURL function", () => {
    let AInstance = mountedA().instance();
    const state = {
      section: "S",
      selectedNeeds: { health: "health", financial: "financial" },
      selectedEligibility: {
        patronType: "family",
        serviceType: "CAF",
        statusAndVitals: ""
      }
    };
    const expectedURL =
      "/A?section=S&selectedNeeds=health,financial&patronType=family&serviceType=CAF&lng=en";
    AInstance.setState(state);
    AInstance.setURL(state);
    expect(Router.push).toBeCalledWith(expectedURL);
  });

  it("has a correct clearFilters function", () => {
    let AInstance = mountedA().instance();
    AInstance.setState({
      section: "S",
      selectedNeeds: { health: "health", financial: "financial" },
      selectedEligibility: {
        patronType: "family",
        serviceType: "CAF",
        statusAndVitals: ""
      },
      favouriteBenefits: [],
      width: 1024
    });
    expect(AInstance.state.selectedEligibility.serviceType).toEqual("CAF");
    AInstance.clearFilters();
    expect(AInstance.state).toEqual({
      section: "S",
      selectedNeeds: { health: "health", financial: "financial" },
      selectedEligibility: {
        patronType: "",
        serviceType: "",
        statusAndVitals: ""
      },
      favouriteBenefits: [],
      width: 1024
    });
    expect(Router.push).toBeCalledWith(
      "/A?section=S&selectedNeeds=health,financial&lng=en"
    );
  });

  it("has a correct clearNeeds function", () => {
    let AInstance = mountedA().instance();
    AInstance.setState({
      section: "S",
      selectedNeeds: { health: "health", financial: "financial" },
      selectedEligibility: {
        patronType: "family",
        serviceType: "CAF",
        statusAndVitals: ""
      },
      width: 1024
    });
    expect(AInstance.state.selectedEligibility.serviceType).toEqual("CAF");
    AInstance.clearNeeds();
    expect(AInstance.state).toEqual({
      section: "S",
      selectedNeeds: {},
      selectedEligibility: {
        patronType: "family",
        serviceType: "CAF",
        statusAndVitals: ""
      },
      favouriteBenefits: [],
      width: 1024
    });
    expect(Router.push).toBeCalledWith(
      "/A?section=S&patronType=family&serviceType=CAF&lng=en"
    );
  });

  it("componentWillMount sets state correctly from empty url", () => {
    expect(mountedA().state().section).toEqual("BB");
  });

  it("componentWillMount sets state correctly from populated url", () => {
    props.url = {
      query: {
        section: "test section",
        selectedNeeds: "health,financial",
        patronType: "family",
        serviceType: "CAF"
      }
    };
    let AInstance = mountedA().instance();
    expect(AInstance.state.section).toEqual("test section");
    expect(AInstance.state.selectedNeeds).toEqual({
      health: "health",
      financial: "financial"
    });
    expect(AInstance.state.selectedEligibility.patronType).toEqual("family");
    expect(AInstance.state.selectedEligibility.serviceType).toEqual("CAF");
    expect(AInstance.state.selectedEligibility.statusAndVitals).toEqual("");
  });

  it("Router.onRouteChangeStart sets state correctly from url", () => {
    let AInstance = mountedA().instance();
    const url = "/A?section=test_section&selectedNeeds=a,b&patronType=cc";
    Router.onRouteChangeStart(url);
    expect(AInstance.state.section).toEqual("test_section");
    expect(AInstance.state.selectedNeeds).toEqual({ a: "a", b: "b" });
    expect(AInstance.state.selectedEligibility.patronType).toEqual("cc");
  });

  it("toggleSelectedEligibility adds and removes id", () => {
    let AInstance = mountedA().instance();
    expect(
      !AInstance.state.selectedEligibility["serviceType"].hasOwnProperty("x")
    );
    AInstance.toggleSelectedEligibility("serviceType", "x")();
    expect(
      AInstance.state.selectedEligibility["serviceType"].hasOwnProperty("x")
    );
    AInstance.toggleSelectedEligibility("serviceType", "x")();
    expect(
      !AInstance.state.selectedEligibility["serviceType"].hasOwnProperty("x")
    );
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
    const state = {
      section: "A1",
      selectedNeeds: {},
      selectedEligibility: {
        patronType: "family",
        serviceType: "CAF",
        statusAndVitals: "released"
      }
    };
    AInstance.setState(state);
    expect(AInstance.state.selectedEligibility.serviceType).toEqual("CAF");
    expect(AInstance.state.selectedEligibility.statusAndVitals).toEqual(
      "released"
    );
    AInstance.setUserProfile("patronType", "organization");
    expect(AInstance.state.selectedEligibility.serviceType).toEqual("");
    expect(AInstance.state.selectedEligibility.statusAndVitals).toEqual("");
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
      benefits: benefitsFixture
    };
    expect(mountedA().instance().props.dispatch).toBeCalledWith({
      type: "LOAD_DATA",
      data: expectedArgs
    });
  });
});

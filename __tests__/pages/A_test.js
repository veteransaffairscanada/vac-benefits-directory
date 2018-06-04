/* eslint-env jest */

import { shallow } from "enzyme";
import Router from "next/router";

import React from "react";
import { A } from "../../pages/A";
import benefitsFixture from "../fixtures/benefits";

jest.mock("react-ga");

describe("A", () => {
  Router.router = {
    push: jest.fn()
  };
  Router.push = jest.fn();

  let props;
  let _mountedA;
  const mountedA = () => {
    if (!_mountedA) {
      _mountedA = shallow(<A {...props} />);
    }
    return _mountedA;
  };

  beforeEach(() => {
    props = {
      url: {
        query: {}
      },
      i18n: undefined,
      t: key => key,
      storeHydrated: true,
      dispatch: jest.fn()
    };
    _mountedA = undefined;
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
        patronType: { family: "family" },
        serviceType: { CAF: "CAF" },
        statusAndVitals: {}
      }
    };
    const expectedURL =
      "/A?section=S&selectedNeeds=health,financial&patronType=family&serviceType=CAF";
    AInstance.setURL(state);
    expect(Router.push).toBeCalledWith(expectedURL);
  });

  it("has a correct clearFilters function", () => {
    let AInstance = mountedA().instance();
    AInstance.setState({
      section: "S",
      selectedNeeds: { health: "health", financial: "financial" },
      selectedEligibility: {
        patronType: { family: "family" },
        serviceType: { CAF: "CAF" },
        statusAndVitals: {}
      }
    });
    expect(AInstance.state.selectedEligibility.serviceType).toEqual({
      CAF: "CAF"
    });
    AInstance.clearFilters();
    expect(AInstance.state).toEqual({
      section: "S",
      selectedNeeds: {},
      selectedEligibility: {
        patronType: {},
        serviceType: {},
        statusAndVitals: {}
      }
    });
    expect(Router.push).toBeCalledWith("/A?section=S");
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
    const expectedState = {
      section: "test section",
      selectedNeeds: { health: "health", financial: "financial" },
      selectedEligibility: {
        patronType: { family: "family" },
        serviceType: { CAF: "CAF" },
        statusAndVitals: {}
      }
    };
    expect(mountedA().state()).toEqual(expectedState);
  });

  it("Router.onRouteChangeStart sets state correctly from url", () => {
    let AInstance = mountedA().instance();
    const url = "/A?section=test_section&selectedNeeds=a,b&patronType=cc";
    Router.onRouteChangeStart(url);
    expect(AInstance.state.section).toEqual("test_section");
    expect(AInstance.state.selectedNeeds).toEqual({ a: "a", b: "b" });
    expect(AInstance.state.selectedEligibility.patronType).toEqual({
      cc: "cc"
    });
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

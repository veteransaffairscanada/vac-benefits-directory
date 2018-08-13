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
  Router.replace = jest.fn();

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
      translations: [],
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
      needs: needsFixture,
      examples: [],
      setPatronType: jest.fn(),
      setSelectedNeeds: jest.fn(),
      setServiceType: jest.fn(),
      setStatusAndVitals: jest.fn(),
      setServiceHealthIssue: jest.fn(),
      favouriteBenefits: []
    };
    _mountedA = undefined;
    mockStore = configureStore();
    reduxData = {
      benefits: benefitsFixture,
      examples: examplesFixture,
      eligibilityPaths: eligibilityPathsFixture,
      needs: needsFixture,
      selectedNeeds: {},
      serviceType: "CAF",
      patronType: "family",
      statusAndVitals: "",
      serviceHealthIssue: "",
      option: ""
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mountedA().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a correct setURL function", () => {
    reduxData.selectedNeeds = { health: "health", financial: "financial" };
    let AInstance = mountedA().instance();
    const state = {
      section: "S"
    };
    const expectedURL =
      "/A?section=S&selectedNeeds=health,financial&patronType=family&serviceType=CAF&lng=en";
    AInstance.setState(state);
    AInstance.setURL(state);
    expect(Router.replace).toBeCalledWith(expectedURL);
  });

  it("componentWillMount sets state correctly from empty url", () => {
    expect(mountedA().state().section).toEqual("A1");
  });

  it("sectionToDisplay returns correct section", () => {
    ["A1", "A2", "A3", "A4"].forEach(section => {
      let AInstance = mountedA().instance();
      expect(AInstance.sectionToDisplay(section).props.id).toEqual(section);
    });
  });

  it("setSection sets the state in section", () => {
    let AInstance = mountedA().instance();
    AInstance.setSection("AA");
    expect(mountedA().state("section")).toEqual("AA");
  });

  it("clears redux data for future questions", () => {
    let AInstance = mountedA().instance();
    AInstance.setSection("A2");
    expect(props.setStatusAndVitals).toBeCalledWith("");
    expect(props.setSelectedNeeds).toBeCalledWith({});
  });
});

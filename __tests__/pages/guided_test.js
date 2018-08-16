/* eslint-env jest */

import { shallow } from "enzyme";
import Router from "next/router";

import React from "react";
import { Guided } from "../../pages/guided";
import benefitsFixture from "../fixtures/benefits";

import elegibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";
import examplesFixture from "../fixtures/examples";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Guided", () => {
  Router.replace = jest.fn();

  let props;
  let _mountedGuided;
  let mockStore, reduxData;

  const mountedGuided = () => {
    if (!_mountedGuided) {
      _mountedGuided = shallow(<Guided {...props} {...reduxData} />);
    }
    return _mountedGuided;
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
    _mountedGuided = undefined;
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
    let html = mountedGuided().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a correct setURL function", () => {
    reduxData.selectedNeeds = { health: "health", financial: "financial" };
    let AInstance = mountedGuided().instance();
    const state = {
      section: "S"
    };
    const expectedURL =
      "/guided?section=S&selectedNeeds=health,financial&patronType=family&serviceType=CAF&lng=en";
    AInstance.setState(state);
    AInstance.setURL(state);
    expect(Router.replace).toBeCalledWith(expectedURL);
  });

  it("componentWillMount sets state correctly from empty url", () => {
    expect(mountedGuided().state().section).toEqual("patronTypeQuestion");
  });

  it("sectionToDisplay returns correct section", () => {
    [
      "patronTypeQuestion",
      "serviceTypeQuestion",
      "statusAndVitalsQuestion",
      "serviceHealthIssueQuestion"
    ].forEach(section => {
      let AInstance = mountedGuided().instance();
      expect(AInstance.sectionToDisplay(section).props.id).toEqual(section);
    });
  });

  it("setSection sets the state in section", () => {
    let AInstance = mountedGuided().instance();
    AInstance.setSection("AA");
    expect(mountedGuided().state("section")).toEqual("AA");
  });

  it("clears redux data for future questions", () => {
    let AInstance = mountedGuided().instance();
    AInstance.setSection("serviceTypeQuestion");
    expect(props.setStatusAndVitals).toBeCalledWith("");
    expect(props.setSelectedNeeds).toBeCalledWith({});
  });
});

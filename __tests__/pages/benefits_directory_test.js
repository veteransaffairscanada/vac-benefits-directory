/* eslint-env jest */

import { shallow } from "enzyme";
import Router from "next/router";

import React from "react";
import { BenefitsDirectory } from "../../pages/benefits-directory";
import benefitsFixture from "../fixtures/benefits";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";
import examplesFixture from "../fixtures/examples";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("BenefitsDirectory", () => {
  Router.router = {
    push: jest.fn()
  };
  Router.push = jest.fn();

  let props;
  let _mountedBenefitsDirectory;
  let mockStore, reduxData;

  const mountedBenefitsDirectory = () => {
    if (!_mountedBenefitsDirectory) {
      _mountedBenefitsDirectory = shallow(
        <BenefitsDirectory {...props} {...reduxData} />
      );
    }
    return _mountedBenefitsDirectory;
  };

  beforeEach(() => {
    props = {
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: key => {
        return key === "current-language-code" ? "en" : key;
      },
      url: { query: {} }
    };
    _mountedBenefitsDirectory = undefined;
    mockStore = configureStore();
    reduxData = {
      text: [],
      benefits: benefitsFixture,
      examples: examplesFixture,
      eligibilityPaths: eligibilityPathsFixture,
      needs: needsFixture,
      selectedNeeds: {},
      serviceType: "CAF",
      patronType: "family",
      statusAndVitals: "",
      favouriteBenefits: [benefitsFixture[0].id]
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mountedBenefitsDirectory().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a working toggleFavourite function", async () => {
    let instance = mountedBenefitsDirectory().instance();
    instance.toggleFavourite("c0");
    instance.toggleFavourite("c1");
    expect(instance.cookies.get("favouriteBenefits")).toEqual(["c0", "c1"]);
    instance.toggleFavourite("c0");
    expect(instance.cookies.get("favouriteBenefits")).toEqual(["c1"]);
  });

  it("has a correct setURL function", () => {
    reduxData.selectedNeeds = { health: "health", financial: "financial" };
    let AInstance = mountedBenefitsDirectory().instance();
    const expectedURL =
      "/benefits-directory?lng=en&selectedNeeds=health,financial&patronType=family&serviceType=CAF";
    AInstance.setURL();
    expect(Router.push).toBeCalledWith(expectedURL);
  });
});

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
      translations: [],
      benefits: benefitsFixture,
      examples: examplesFixture,
      eligibilityPaths: eligibilityPathsFixture,
      enIdx: JSON.stringify({
        version: "2.2.1",
        fields: ["vacNameEn", "oneLineDescriptionEn"],
        fieldVectors: [
          ["vacNameEn/1", [0, 0.288]],
          ["oneLineDescriptionEn/1", [1, 0.288]]
        ],
        invertedIndex: [
          [
            "biz",
            { _index: 1, vacNameEn: {}, oneLineDescriptionEn: { "1": {} } }
          ],
          [
            "fiz",
            { _index: 0, vacNameEn: { "1": {} }, oneLineDescriptionEn: {} }
          ]
        ],
        pipeline: ["stemmer"]
      }),
      frIdx: JSON.stringify({
        version: "2.2.1",
        fields: ["vacNameFr", "oneLineDescriptionFr"],
        fieldVectors: [
          ["vacNameFr/1", [0, 0.288]],
          ["oneLineDescriptionFr/1", [1, 0.288]]
        ],
        invertedIndex: [
          [
            "biz",
            { _index: 1, vacNameFr: {}, oneLineDescriptionFr: { "1": {} } }
          ],
          [
            "fiz",
            { _index: 0, vacNameFr: { "1": {} }, oneLineDescriptionFr: {} }
          ]
        ],
        pipeline: ["stemmer"]
      }),
      needs: needsFixture,
      searchString: "",
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

  it("has a correct setURL function", () => {
    reduxData.selectedNeeds = { health: "health", financial: "financial" };
    reduxData.searchString = "foo";
    let AInstance = mountedBenefitsDirectory().instance();
    const expectedURL =
      "/benefits-directory?lng=en&selectedNeeds=health,financial&patronType=family&serviceType=CAF&searchString=foo";
    AInstance.setURL();
    expect(Router.push).toBeCalledWith(expectedURL);
  });
});

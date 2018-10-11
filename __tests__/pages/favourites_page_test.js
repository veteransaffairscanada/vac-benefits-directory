/* eslint-env jest */

import { shallow } from "enzyme";
import Router from "next/router";
import lunr from "lunr";
import React from "react";
import { FavouritesPage } from "../../pages/favourites";
import benefitsFixture from "../fixtures/benefits";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import areaOfficesFixture from "../fixtures/area_offices";
import questionsFixture from "../fixtures/questions";
import translate from "../fixtures/translate";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Favourites Page", () => {
  Router.router = {
    push: jest.fn()
  };
  Router.push = jest.fn();

  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: translate,
      url: { query: {} }
    };
    mockStore = configureStore();
    reduxData = {
      questions: questionsFixture,
      cookiesDisabled: false,
      setCookiesDisabled: jest.fn(),
      option: "",
      translations: [],
      benefits: benefitsFixture,
      // examples: examplesFixture,
      eligibilityPaths: eligibilityPathsFixture,
      enIdx: JSON.stringify({
        version: lunr.version,
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
        version: lunr.version,
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
      // serviceType: "CAF",
      sortBy: "relevance",
      // patronType: "family",
      // statusAndVitals: "",
      // serviceHealthIssue: "",
      favouriteBenefits: [benefitsFixture[0].id],
      areaOffices: areaOfficesFixture,
      selectedAreaOffice: areaOfficesFixture[0],
      closestAreaOffice: areaOfficesFixture[0]
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = shallow(<FavouritesPage {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});

/* eslint-env jest */

import { shallow } from "enzyme";
import Router from "next/router";

import React from "react";
import { FavouritesPage } from "../../pages/favourites";
import benefitsFixture from "../fixtures/benefits";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";
import examplesFixture from "../fixtures/examples";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import areaOfficesFixture from "../fixtures/area_offices";

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
      t: key => {
        return key === "current-language-code" ? "en" : key;
      },
      url: { query: {} }
    };
    mockStore = configureStore();
    reduxData = {
      translations: [],
      benefits: benefitsFixture,
      examples: examplesFixture,
      eligibilityPaths: eligibilityPathsFixture,
      needs: needsFixture,
      selectedNeeds: {},
      serviceType: "CAF",
      patronType: "family",
      statusAndVitals: "",
      favouriteBenefits: [benefitsFixture[0].id],
      option: "",
      pageWidth: 1000,
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

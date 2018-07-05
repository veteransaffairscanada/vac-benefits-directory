/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";

import { AllBenefits } from "../../pages/all-benefits";
import benefitsFixture from "../fixtures/benefits";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import configureStore from "redux-mock-store";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("AllBenefits", () => {
  let props;
  let _mountedAllBenefits;
  let mockStore, reduxData;

  const mountedAllBenefits = () => {
    if (!_mountedAllBenefits) {
      _mountedAllBenefits = shallow(<AllBenefits {...props} {...reduxData} />);
    }
    return _mountedAllBenefits;
  };

  beforeEach(() => {
    props = {
      translations: [],
      t: key => key,
      i18n: {
        addResourceBundle: jest.fn()
      },
      storeHydrated: true,
      loadDataStore: jest.fn(),
      favouriteBenefits: [],
      showFavourites: true,
      toggleFavourite: () => true
    };
    _mountedAllBenefits = undefined;
    mockStore = configureStore();
    reduxData = {
      benefits: benefitsFixture,
      examples: [],
      eligibilityPaths: eligibilityPathsFixture
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mountedAllBenefits().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows the list of all benefits available", () => {
    expect(mountedAllBenefits().find(".benefitCard").length).toEqual(3);
    mountedAllBenefits()
      .find("BenefitCard")
      .map((bc, i) => {
        expect(bc.props().benefit.vac_name_en).toEqual(
          benefitsFixture[i].vac_name_en
        );
      });
  });
});

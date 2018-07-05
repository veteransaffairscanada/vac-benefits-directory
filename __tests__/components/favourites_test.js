/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";

import { Favourites } from "../../components/favourites";
import benefitsFixture from "../fixtures/benefits";
import examplesFixture from "../fixtures/examples";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Favourites", () => {
  let props;
  let _mountedFavourites;
  let _shallowFavourites;
  let mockStore, reduxData;

  const mountedFavourites = () => {
    if (!_mountedFavourites) {
      _mountedFavourites = mount(<Favourites {...props} {...reduxData} />);
    }
    return _mountedFavourites;
  };

  const shallowFavourites = () => {
    if (!_shallowFavourites) {
      _shallowFavourites = shallow(<Favourites {...props} {...reduxData} />);
    }
    return _shallowFavourites;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      classes: {},
      selectedEligibility: {
        serviceType: "",
        patronType: "",
        statusAndVitals: ""
      },
      toggleSelectedEligibility: jest.fn(),
      url: { query: {} },
      favouriteBenefits: ["3"],
      toggleFavourite: () => true
    };
    _shallowFavourites = undefined;
    _mountedFavourites = undefined;

    mockStore = configureStore();
    reduxData = {
      benefits: benefitsFixture,
      examples: examplesFixture,
      needs: needsFixture,
      selectedNeeds: {},
      eligibilityPaths: eligibilityPathsFixture
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mountedFavourites().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("displays only one benefit", async () => {
    expect(mountedFavourites().find("BenefitCard").length).toEqual(1);
    expect(
      mountedFavourites()
        .find("BenefitCard")
        .first()
        .props().benefit.id
    ).toEqual("3");
  });

  it("renders with no favourites", async () => {
    props.favouriteBenefits = [];
    expect(mountedFavourites().find("BenefitCard").length).toEqual(0);
  });

  it("renders with 2 favourites", async () => {
    props.favouriteBenefits = ["0", "3"];
    expect(mountedFavourites().find("BenefitCard").length).toEqual(2);
  });

  it("has a working filterBenefits function", async () => {
    const favouritesInstance = shallowFavourites().instance();
    expect(
      favouritesInstance.filterBenefits(benefitsFixture, []).length
    ).toEqual(0);
    expect(
      favouritesInstance.filterBenefits(benefitsFixture, ["0"]).length
    ).toEqual(1);
    expect(
      favouritesInstance.filterBenefits(benefitsFixture, ["1", "3"]).length
    ).toEqual(2);
  });
});

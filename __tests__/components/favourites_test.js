/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import configureStore from "redux-mock-store";
import { Favourites } from "../../components/favourites";
import benefitsFixture from "../fixtures/benefits";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import areaOfficesFixture from "../fixtures/area_offices";
import needsFixture from "../fixtures/needs";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";

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
      selectedEligibility: {
        serviceType: "",
        patronType: "",
        statusAndVitals: ""
      },
      url: { query: {} }
    };
    _shallowFavourites = undefined;
    _mountedFavourites = undefined;

    mockStore = configureStore();
    reduxData = {
      cookiesDisabled: false,
      setCookiesDisabled: jest.fn(),
      benefits: benefitsFixture,
      needs: needsFixture,
      favouriteBenefits: ["benefit_2"],
      selectedNeeds: {},
      eligibilityPaths: eligibilityPathsFixture,
      areaOffices: areaOfficesFixture,
      selectedAreaOffice: areaOfficesFixture[0],
      closestAreaOffice: areaOfficesFixture[0],
      multipleChoiceOptions: multipleChoiceOptionsFixture
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
    ).toEqual("benefit_2");
  });

  it("renders with no favourites", async () => {
    reduxData.favouriteBenefits = [];
    props.store = mockStore(reduxData);
    expect(mountedFavourites().find("BenefitCard").length).toEqual(0);
  });

  it("renders with 2 favourites", async () => {
    reduxData.favouriteBenefits = ["benefit_0", "benefit_3"];
    props.store = mockStore(reduxData);
    expect(mountedFavourites().find("BenefitCard").length).toEqual(2);
  });

  it("has a working filterBenefits function", async () => {
    const favouritesInstance = shallowFavourites().instance();
    expect(
      favouritesInstance.filterBenefits(benefitsFixture, []).length
    ).toEqual(0);
    expect(
      favouritesInstance.filterBenefits(benefitsFixture, ["benefit_0"]).length
    ).toEqual(1);
    expect(
      favouritesInstance.filterBenefits(benefitsFixture, [
        "benefit_1",
        "benefit_3"
      ]).length
    ).toEqual(2);
  });
});

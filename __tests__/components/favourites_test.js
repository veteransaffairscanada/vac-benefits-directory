/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";

import { Favourites } from "../../components/favourites";
import benefitsFixture from "../fixtures/benefits";
import elegibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Favourites", () => {
  let props;
  let _mountedFavourites;
  let _shallowFavourites;

  const mountedFavourites = () => {
    if (!_mountedFavourites) {
      _mountedFavourites = mount(<Favourites {...props} />);
    }
    return _mountedFavourites;
  };

  const shallowFavourites = () => {
    if (!_shallowFavourites) {
      _shallowFavourites = shallow(<Favourites {...props} />);
    }
    return _shallowFavourites;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      benefits: benefitsFixture,
      classes: {},
      eligibilityPaths: elegibilityPathsFixture,
      selectedNeeds: {},
      needs: needsFixture,
      examples: [],
      selectedEligibility: {
        serviceType: "",
        patronType: "",
        statusAndVitals: ""
      },
      toggleSelectedEligibility: jest.fn(),
      classes: {},
      url: { query: {} },
      favouriteBenefits: ["3"],
      toggleFavourite: () => true
    };
    _shallowFavourites = undefined;
    _mountedFavourites = undefined;
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

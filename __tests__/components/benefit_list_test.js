import React from "react";
import { mount, shallow } from "enzyme";
import { BenefitList } from "../../components/benefit_list";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

import benefitsFixture from "../fixtures/benefits";
import examplesFixture from "../fixtures/examples";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";

import configureStore from "redux-mock-store";
import needsFixture from "../fixtures/needs";

describe("BenefitList", () => {
  let props;
  let _mountedBenefitList;
  let _shallowBenefitList;
  let mockStore, reduxData;

  const mountedBenefitList = () => {
    if (!_mountedBenefitList) {
      _mountedBenefitList = mount(<BenefitList {...props} {...reduxData} />);
    }
    return _mountedBenefitList;
  };

  const shallowBenefitList = () => {
    if (!_shallowBenefitList) {
      _shallowBenefitList = shallow(<BenefitList {...props} {...reduxData} />);
    }
    return _shallowBenefitList;
  };

  beforeEach(() => {
    props = {
      classes: {},
      t: key => key,
      filteredBenefits: benefitsFixture,
      onRef: k => k,
      sortByValue: "",
      searchString: "",
      showFavourites: true,
      toggleFavourite: () => true,
      favouriteBenefits: []
    };
    _mountedBenefitList = undefined;
    _shallowBenefitList = undefined;

    mockStore = configureStore();
    reduxData = {
      benefits: benefitsFixture,
      eligibilityPaths: eligibilityPathsFixture,
      examples: examplesFixture,
      needs: needsFixture,
      selectedNeeds: {}
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mountedBenefitList().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a correct sortBenefits function when sorting by popularity", () => {
    let BLInstance = shallowBenefitList().instance();
    expect(
      BLInstance.sortBenefits(benefitsFixture, "en", "popularity").map(
        b => b.id
      )
    ).toEqual(["3", "1", "0"]);
  });

  it("has a correct sortBenefits function when sorting alphabetically", () => {
    let BLInstance = shallowBenefitList().instance();
    expect(
      BLInstance.sortBenefits(benefitsFixture, "en", "alphabetical").map(
        b => b.id
      )
    ).toEqual(["1", "0", "3"]);
  });

  it("displays the correct number of benefits cards", () => {
    expect(mountedBenefitList().find("BenefitCard").length).toEqual(3);
  });
});

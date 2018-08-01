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
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      t: key => key,
      filteredBenefits: benefitsFixture,
      onRef: k => k,
      sortByValue: "",
      searchString: "",
      showFavourites: true,
      option: ""
    };

    mockStore = configureStore();
    reduxData = {
      benefits: benefitsFixture,
      favouriteBenefits: [],
      eligibilityPaths: eligibilityPathsFixture,
      examples: examplesFixture,
      needs: needsFixture,
      selectedNeeds: {},
      pageWidth: 1000
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(<BenefitList {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a correct cleanSortingPriority function", () => {
    let BLInstance = shallow(
      <BenefitList {...props} {...reduxData} />
    ).instance();
    expect(BLInstance.cleanSortingPriority("high")).toEqual("high");
    expect(BLInstance.cleanSortingPriority("medium")).toEqual("medium");
    expect(BLInstance.cleanSortingPriority("low")).toEqual("low");
    expect(BLInstance.cleanSortingPriority("bad value")).toEqual("low");
    expect(BLInstance.cleanSortingPriority(undefined)).toEqual("low");
  });

  it("has a correct sortBenefits function when sorting by popularity", () => {
    let BLInstance = shallow(
      <BenefitList {...props} {...reduxData} />
    ).instance();
    expect(
      BLInstance.sortBenefits(benefitsFixture, "en", "popularity").map(
        b => b.id
      )
    ).toEqual(["3", "1", "0"]);
  });

  it("has a correct sortBenefits function when sorting alphabetically", () => {
    let BLInstance = shallow(
      <BenefitList {...props} {...reduxData} />
    ).instance();
    expect(
      BLInstance.sortBenefits(benefitsFixture, "en", "alphabetical").map(
        b => b.id
      )
    ).toEqual(["1", "0", "3"]);
  });

  it("displays the correct number of benefits cards", () => {
    expect(
      mount(<BenefitList {...props} {...reduxData} />).find("BenefitCard")
        .length
    ).toEqual(3);
  });
});

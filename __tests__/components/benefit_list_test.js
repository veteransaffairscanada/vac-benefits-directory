import React from "react";
import { mount, shallow } from "enzyme";
import { BenefitList } from "../../components/benefit_list";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

import benefitsFixture from "../fixtures/benefits";
import examplesFixture from "../fixtures/examples";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";

import configureStore from "redux-mock-store";

describe("BenefitList", () => {
  let props;
  let _mountedBenefitList;
  let _shallowBenefitList;
  let mockStore, data;

  const mountedBenefitList = () => {
    if (!_mountedBenefitList) {
      _mountedBenefitList = mount(<BenefitList {...props} {...data} />);
    }
    return _mountedBenefitList;
  };

  const shallowBenefitList = () => {
    if (!_shallowBenefitList) {
      _shallowBenefitList = shallow(<BenefitList {...props} {...data} />);
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
      favouriteBenefits: benefitsFixture
    };
    _mountedBenefitList = undefined;
    _shallowBenefitList = undefined;

    mockStore = configureStore();
    props.store = mockStore();
    data = {
      benefits: benefitsFixture,
      eligibilityPaths: eligibilityPathsFixture,
      examples: examplesFixture
    };
    props.store.dispatch({ type: "LOAD_DATA", data: data });
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

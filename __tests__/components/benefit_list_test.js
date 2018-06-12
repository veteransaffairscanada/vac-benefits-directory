import React from "react";
import { mount, shallow } from "enzyme";
import { BenefitList } from "../../components/benefit_list";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

import benefitsFixture from "../fixtures/benefits";
import examplesFixture from "../fixtures/examples";

describe("BenefitList", () => {
  let props;
  let _mountedBenefitList;
  let _shallowBenefitList;

  const mountedBenefitList = () => {
    if (!_mountedBenefitList) {
      _mountedBenefitList = mount(<BenefitList {...props} />);
    }
    return _mountedBenefitList;
  };

  const shallowBenefitList = () => {
    if (!_shallowBenefitList) {
      _shallowBenefitList = shallow(<BenefitList {...props} />);
    }
    return _shallowBenefitList;
  };

  beforeEach(() => {
    props = {
      classes: {},
      t: key => key,
      filteredBenefits: [],
      eligibilityPaths: [],
      benefits: benefitsFixture,
      examples: examplesFixture,
      onRef: k => k,
      sortByValue: "Alphabetical"
    };
    _mountedBenefitList = undefined;
    _shallowBenefitList = undefined;
  });

  it("passes axe tests", async () => {
    let html = shallowBenefitList().html();
    expect(await axe(html)).toHaveNoViolations();
  });
});

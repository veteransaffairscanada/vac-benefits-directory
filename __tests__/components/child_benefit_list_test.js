import React from "react";
import { mount } from "enzyme";
import ChildBenefitList from "../../components/child_benefit_list";
import benefitsFixture from "../fixtures/benefits";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("ChildBenefitList", () => {
  let props;
  beforeEach(() => {
    props = {
      benefits: benefitsFixture,
      colonText: "abc",
      t: x => x
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<ChildBenefitList {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows correct number of benefits", () => {
    expect(
      mount(<ChildBenefitList {...props} />).find("HeaderLink").length
    ).toEqual(props.benefits.length);
  });
});

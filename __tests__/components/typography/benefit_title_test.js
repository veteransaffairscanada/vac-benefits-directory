import React from "react";
import { mount } from "enzyme";
import BenefitTitle from "../../../components/typography/benefit_title";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("BenefitTitle", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "header"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<BenefitTitle {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<BenefitTitle {...props} />).text()).toEqual("header");
  });
});

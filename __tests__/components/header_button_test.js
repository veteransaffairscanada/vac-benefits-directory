import React from "react";
import { mount } from "enzyme";
import HeaderButton from "../../components/header_button";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("HeaderButton", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "header"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<HeaderButton {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<HeaderButton {...props} />).text()).toEqual("header");
  });
});

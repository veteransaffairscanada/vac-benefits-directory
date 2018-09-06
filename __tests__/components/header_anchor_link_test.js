import React from "react";
import { mount } from "enzyme";
import HeaderAnchorLink from "../../components/header_anchor_link";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("HeaderAnchorLink", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "header"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<HeaderAnchorLink {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<HeaderAnchorLink {...props} />).text()).toEqual("header");
  });
});

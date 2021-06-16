import React from "react";
import { mount } from "enzyme";
import HeaderLink from "../../components/header_link";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("HeaderLink", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "header",
      href: "/"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<HeaderLink {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<HeaderLink {...props} />).text()).toEqual("header");
  });
});

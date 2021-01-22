import React from "react";
import { mount } from "enzyme";
import HeaderLink from "../../components/header_link";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("HeaderLink", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "canada.ca",
      href: "https://www.canada.ca/en.html"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<HeaderLink {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<HeaderLink {...props} />).text()).toEqual("canada.ca");
  });
});

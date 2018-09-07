import React from "react";
import { mount } from "enzyme";
import FooterLink from "../../components/footer_link";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("FooterLink", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "header",
      href: "/test"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<FooterLink {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<FooterLink {...props} />).prop("href")).toEqual("/test");
  });
});

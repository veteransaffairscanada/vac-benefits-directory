import React from "react";
import { mount } from "enzyme";
import AnchorLink from "../../../components/typography/anchor_link";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("AnchorLink", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "header",
      href: "#",
      onClick: jest.fn()
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<AnchorLink {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("calls onClick when clicked", () => {
    mount(<AnchorLink {...props} />).simulate("click");
    expect(props.onClick).toBeCalled();
  });
});

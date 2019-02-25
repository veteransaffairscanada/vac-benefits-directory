import React from "react";
import { mount } from "enzyme";
import Button from "../../components/button";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Button", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "button text"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<Button {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<Button {...props} />).text()).toEqual("button text");
  });
});

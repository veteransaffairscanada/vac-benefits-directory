import React from "react";
import { mount } from "enzyme";
import FooterButton from "../../components/button";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("FooterButton", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "button text",
      onClick: jest.fn()
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<FooterButton {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("to have correct text", () => {
    expect(mount(<FooterButton {...props} />).text()).toEqual("button text");
  });

  it("calls onClick fn when clicked", () => {
    mount(<FooterButton {...props} />).simulate("click");
    expect(props.onClick).toBeCalled();
  });
});

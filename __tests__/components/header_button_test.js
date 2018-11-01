import React from "react";
import { mount } from "enzyme";
import Router from "next/router";
import HeaderButton from "../../components/header_button";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("HeaderButton", () => {
  let props;
  beforeEach(() => {
    window.open = jest.fn();
    Router.push = jest.fn();
    window.location.assign = jest.fn();
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

  it("is not wrapped in a <Link> if useLink is not specified", () => {
    let component = mount(<HeaderButton {...props} />);
    expect(component.find("Link").exists()).toBeFalsy();
  });
  it("is wrapped in a <Link> if useLink is specified", () => {
    props.useLink = true;
    let component = mount(<HeaderButton {...props} />);
    expect(component.find("Link").exists()).toBeTruthy();
  });
});

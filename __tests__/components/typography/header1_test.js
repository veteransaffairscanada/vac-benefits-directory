import React from "react";
import { mount } from "enzyme";
import Header1 from "../../../components/typography/header1";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Header1", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "header"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<Header1 {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<Header1 {...props} />).text()).toEqual("header");
  });
});

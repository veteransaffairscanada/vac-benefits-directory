import React from "react";
import { mount } from "enzyme";
import Header4 from "../../../components/typography/header4";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Header4", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "header"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<Header4 {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<Header4 {...props} />).text()).toEqual("header");
  });
});

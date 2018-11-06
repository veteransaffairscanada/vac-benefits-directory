import React from "react";
import { mount } from "enzyme";
import Header3 from "../../../components/typography/header3";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Header3", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "header"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<Header3 {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<Header3 {...props} />).text()).toEqual("header");
  });
});

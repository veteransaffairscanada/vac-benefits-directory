import React from "react";
import { mount } from "enzyme";
import SidebarDetails from "../../components/sidebar_details";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("SidebarDetails", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "details text",
      summary: "summary text"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<SidebarDetails {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});

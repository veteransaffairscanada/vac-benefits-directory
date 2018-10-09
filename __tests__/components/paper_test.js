import React from "react";
import { mount } from "enzyme";
import Paper from "../../components/paper";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Paper", () => {
  let props;
  beforeEach(() => {
    props = {
      children: <div id="test_div">hello</div>
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<Paper {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<Paper {...props} />).find("#test_div").length).toEqual(1);
  });
});

import React from "react";
import { mount } from "enzyme";
import Container from "../../components/container";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Container", () => {
  let props;
  beforeEach(() => {
    props = {
      children: <div id="test_div">hello</div>
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<Container {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<Container {...props} />).find("#test_div").length).toEqual(1);
  });
});

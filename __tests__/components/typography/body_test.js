import React from "react";
import { mount } from "enzyme";
import Body from "../../typography/components/body";
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
    let html = mount(<Body {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<Body {...props} />).find("#test_div")).toHaveLength(1);
  });
});

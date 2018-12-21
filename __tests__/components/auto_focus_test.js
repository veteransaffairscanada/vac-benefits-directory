import React from "react";
import { mount } from "enzyme";
import AutoFocus from "../../components/auto_focus";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("AutoFocus", () => {
  let props;

  beforeEach(() => {
    window.scrollTo = jest.fn();
    props = {
      children: <div id="test">blah</div>
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<AutoFocus {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("renders children", async () => {
    expect(mount(<AutoFocus {...props} />).find("#test").length).toEqual(1);
  });
});

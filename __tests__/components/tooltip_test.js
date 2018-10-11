import React from "react";
import { mount } from "enzyme";
import Tooltip from "../../components/tooltip";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Tooltip", () => {
  let props;
  beforeEach(() => {
    props = {
      children: <div id="test_div">hello</div>,
      disabled: false,
      tooltipText: "tooltip text"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<Tooltip {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<Tooltip {...props} />).find("#test_div").length).toEqual(1);
  });

  it("shows tooltip if disabled = false", () => {
    expect(mount(<Tooltip {...props} />).find("span").length).toEqual(1);
  });

  it("does not show tooltip if disabled = true", () => {
    props.disabled = true;
    expect(mount(<Tooltip {...props} />).find("span").length).toEqual(0);
  });
});

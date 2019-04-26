import React from "react";
import { mount } from "enzyme";
import SkipToMainContent from "../../components/skip_to_main_content";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("SkipToMainContent", () => {
  let props;
  beforeEach(() => {
    props = {
      skipLink: "/index",
      t: x => x
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<SkipToMainContent {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});

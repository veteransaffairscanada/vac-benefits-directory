import React from "react";
import { mount } from "enzyme";
import Details from "../../components/details";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Details", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "details text",
      summary: "summary text"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<Details {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});

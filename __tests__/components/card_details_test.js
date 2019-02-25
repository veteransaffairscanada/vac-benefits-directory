import React from "react";
import { mount } from "enzyme";
import CardDetails from "../../components/card_details";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("CardDetails", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "details text",
      summary: "summary text"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<CardDetails {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});

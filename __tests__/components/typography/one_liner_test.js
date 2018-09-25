import React from "react";
import { mount } from "enzyme";
import OneLiner from "../../../components/typography/one_liner";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
describe("OneLiner", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "one liner"
    };
  });
  it("passes axe tests", async () => {
    let html = mount(<OneLiner {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
  it("shows children", () => {
    expect(mount(<OneLiner {...props} />).text()).toEqual("one liner");
  });
});

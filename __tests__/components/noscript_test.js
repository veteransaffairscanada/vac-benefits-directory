import React from "react";
import Noscript from "../../components/noscript";
import { mount } from "enzyme";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Test Noscript component", () => {
  it("passes axe tests", async () => {
    let html = mount(<Noscript t={key => key} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});

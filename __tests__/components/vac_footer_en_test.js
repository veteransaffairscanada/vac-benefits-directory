import React from "react";
import { mount } from "enzyme";
import VacFooterEn from "../../components/vac_footer_en";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("VacFooterEn", () => {
  it("passes axe tests", async () => {
    let html = mount(<VacFooterEn />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});

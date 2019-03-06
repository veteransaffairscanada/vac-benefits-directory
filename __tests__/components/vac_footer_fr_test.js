import React from "react";
import { mount } from "enzyme";
import VacFooterFr from "../../components/vac_footer_fr";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("VacFooterFr", () => {
  it("passes axe tests", async () => {
    let html = mount(<VacFooterFr />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});

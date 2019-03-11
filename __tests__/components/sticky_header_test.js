import React from "react";
import { mount } from "enzyme";
import { StickyHeader } from "../../components/sticky_header";
const { axe, toHaveNoViolations } = require("jest-axe");
import translate from "../fixtures/translate";

expect.extend(toHaveNoViolations);

describe("StickyHeader", () => {
  let props;
  beforeEach(() => {
    props = {
      t: translate,
      children: "button text",
      favouriteBenefits: [],
      favouritesUrl: "/favourites",
      printUrl: "/print",
      summaryUrl: "/summary",
      showShareLink: true,
      url: { url: "test_url" }
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<StickyHeader {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains saved list text that displays the number of saved list items", async () => {
    expect(
      mount(<StickyHeader {...props} />)
        .find("#savedBenefits")
        .first()
        .find("span")
        .first()
        .text()
    ).toContain("0");
  });

  it("contains edit selections link", () => {
    expect(
      mount(<StickyHeader {...props} />)
        .find("#editSelections")
        .first().length
    ).toEqual(1);
  });

  it("contains href to summary page in edit selections link", () => {
    expect(
      mount(<StickyHeader {...props} />)
        .find("#editSelections")
        .first()
        .prop("href")
    ).toEqual(props.summaryUrl);
  });
});

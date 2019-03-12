import NoResultsButtons from "../../components/no_results_buttons";
import React from "react";
import { mount, shallow } from "enzyme";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("NoResultsButtons", () => {
  let props;
  beforeEach(() => {
    props = {
      clearFilters: x => x,
      url: { url: "asdf" },
      t: x => x
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<NoResultsButtons {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains 2 buttons", () => {
    expect(
      shallow(<NoResultsButtons {...props} />).find("Button").length
    ).toEqual(2);
  });
});

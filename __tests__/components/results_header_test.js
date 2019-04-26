import ResultsHeader from "../../components/results_header";
import React from "react";
import { mount, shallow } from "enzyme";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("ResultsHeader", () => {
  let props;
  beforeEach(() => {
    props = {
      headerText: "asdf",
      searchString: "asdf",
      benefitCount: 2
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<ResultsHeader {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("returns a Header if there is at least one result", () => {
    expect(shallow(<ResultsHeader {...props} />).html()).not.toEqual(null);
  });

  it("returns an empty string if there are no results", () => {
    props.benefitCount = 0;
    expect(shallow(<ResultsHeader {...props} />).html()).toEqual(null);
  });
});

import React from "react";
import { mount } from "enzyme";
import { ExampleBullets } from "../../components/example_bullets";
import benefitExamplesFixture from "../fixtures/benefitExamples";
import benefitsFixture from "../fixtures/benefits";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("ExampleBullets", () => {
  let props;
  beforeEach(() => {
    props = {
      t: x => x,
      benefit: benefitsFixture[0],
      benefitExamples: benefitExamplesFixture,
      searchString: "",
      language: "en"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<ExampleBullets {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has the example list", () => {
    expect(mount(<ExampleBullets {...props} />).find("ul").length).not.toEqual(
      0
    );
  });

  it("renders the correct number of next steps", () => {
    expect(mount(<ExampleBullets {...props} />).find("li").length).toEqual(1);
  });

  it("renders the correct See More Content sentence", () => {
    // language is not set so should fall back to french
    expect(mount(<ExampleBullets {...props} />).html()).toContain(
      props.benefit.seeMoreSentenceFr
    );
  });
});

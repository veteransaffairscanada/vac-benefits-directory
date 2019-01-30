import React from "react";
import { NextSteps } from "../../components/next_steps";
import { mount } from "enzyme";
import translate from "../fixtures/translate";
import nextStepsFixture from "../fixtures/nextSteps";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("NextSteps", () => {
  let props;
  beforeEach(() => {
    props = {
      t: translate,
      filteredNextSteps: nextStepsFixture
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<NextSteps {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has the next steps list", () => {
    expect(
      mount(<NextSteps {...props} />).find("#nextStepsList").length
    ).not.toEqual(0);
  });

  it("renders the correct number of next steps", () => {
    expect(mount(<NextSteps {...props} />).find("li").length).toEqual(
      props.filteredNextSteps.length
    );
  });

  it("renders nothing if there are no next steps", () => {
    props.filteredNextSteps = [];
    expect(mount(<NextSteps {...props} />).html()).toEqual(null);
  });

  it("renders an anchor tag if a markdown link is included", () => {
    expect(
      mount(<NextSteps {...props} />)
        .find("li")
        .find("a").length
    ).toEqual(1);
  });
});

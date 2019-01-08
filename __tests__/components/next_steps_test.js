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
      mapUrl: "/map",
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

  it("has the MyVac card", () => {
    expect(
      mount(<NextSteps {...props} />).find("#myVacCard").length
    ).not.toEqual(0);
  });

  it("has the find nearby offic card", () => {
    expect(
      mount(<NextSteps {...props} />).find("#nearbyOfficeCard").length
    ).not.toEqual(0);
  });

  it("register now link has a blank target", () => {
    expect(
      mount(<NextSteps {...props} />)
        .find("#registerNowLink")
        .prop("target")
    ).toEqual("_blank");
  });

  it("myVAC account button uses the expected label", () => {
    expect(
      mount(<NextSteps {...props} />)
        .find("#myVacAccountButton")
        .last()
        .text()
    ).toContain("nextSteps.myvac_button_text");
  });

  it("find nearby office link has expected href", () => {
    expect(
      mount(<NextSteps {...props} />)
        .find("#nearbyOfficeLink")
        .first()
        .prop("href")
    ).toEqual("/map");
  });

  it("renders the correct number of next steps", () => {
    expect(mount(<NextSteps {...props} />).find("li").length).toEqual(
      props.filteredNextSteps.length
    );
  });

  it("renders an anchor tag if a markdown link is included", () => {
    expect(
      mount(<NextSteps {...props} />)
        .find("li")
        .find("a").length
    ).toEqual(1);
  });
});

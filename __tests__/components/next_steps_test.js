import React from "react";
import { NextSteps } from "../../components/next_steps";
import { mount } from "enzyme";
import translate from "../fixtures/translate";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("NextSteps", () => {
  let props;
  let reduxState;
  beforeEach(() => {
    props = {
      t: translate,
      mapUrl: { query: {}, route: "/map" }
    };

    reduxState = {};
    props.reduxState = reduxState;
  });

  it("passes axe tests", async () => {
    let html = mount(<NextSteps {...props} {...reduxState} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has the next steps list", () => {
    expect(
      mount(<NextSteps {...props} {...reduxState} />).find("#nextStepsList")
        .length
    ).not.toEqual(0);
  });

  it("has the MyVac card", () => {
    expect(
      mount(<NextSteps {...props} {...reduxState} />).find("#myVacCard").length
    ).not.toEqual(0);
  });

  it("has the find nearby offic card", () => {
    expect(
      mount(<NextSteps {...props} {...reduxState} />).find("#nearbyOfficeCard")
        .length
    ).not.toEqual(0);
  });

  it("register now link has a blank target", () => {
    expect(
      mount(<NextSteps {...props} {...reduxState} />)
        .find("#registerNowLink")
        .prop("target")
    ).toEqual("_blank");
  });

  it("myVAC account button uses the expected label", () => {
    expect(
      mount(<NextSteps {...props} {...reduxState} />)
        .find("#myVacAccountButton")
        .last()
        .text()
    ).toContain("nextSteps.myvac_button_text");
  });

  it("find nearby office link has expected href", () => {
    expect(
      mount(<NextSteps {...props} {...reduxState} />)
        .find("#nearbyOfficeLink")
        .prop("href")
    ).toEqual({ query: {}, route: "/map" });
  });
});

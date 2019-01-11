import React from "react";
import { ContactUs } from "../../components/contact_us";
import { mount } from "enzyme";
import translate from "../fixtures/translate";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("ContactUs", () => {
  let props;
  beforeEach(() => {
    props = {
      t: translate,
      mapUrl: "/map"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<ContactUs {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has the MyVac card", () => {
    expect(
      mount(<ContactUs {...props} />).find("#myVacCard").length
    ).not.toEqual(0);
  });

  it("has the find nearby office card", () => {
    expect(
      mount(<ContactUs {...props} />).find("#nearbyOfficeCard").length
    ).not.toEqual(0);
  });

  it("register now link has a blank target", () => {
    expect(
      mount(<ContactUs {...props} />)
        .find("#registerNowLink")
        .prop("target")
    ).toEqual("_blank");
  });

  it("myVAC account button uses the expected label", () => {
    expect(
      mount(<ContactUs {...props} />)
        .find("#myVacAccountButton")
        .last()
        .text()
    ).toContain("nextSteps.myvac_button_text");
  });

  it("find nearby office link has expected href", () => {
    expect(
      mount(<ContactUs {...props} />)
        .find("#nearbyOfficeLink")
        .first()
        .prop("href")
    ).toEqual("/map");
  });
});

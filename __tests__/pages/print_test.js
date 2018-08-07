/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";
import { Print } from "../../pages/print";
import benefitsFixture from "../fixtures/benefits";
import elegibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import areaOfficesFixture from "../fixtures/area_offices";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");
global.window = {};
global.window.print = jest.fn();

describe("Print", () => {
  let props;
  let _mountedPrint;
  const mountedPrint = () => {
    if (!_mountedPrint) {
      _mountedPrint = shallow(<Print {...props} />);
    }
    return _mountedPrint;
  };

  beforeEach(() => {
    props = {
      url: {
        query: {}
      },
      translations: [],
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: key => {
        return key == "current-language-code" ? "en" : key;
      },
      benefits: benefitsFixture,
      classes: {},
      eligibilityPaths: elegibilityPathsFixture,
      selectedNeeds: {},
      needs: needsFixture,
      examples: [],
      selectedEligibility: {
        serviceType: "",
        patronType: "",
        statusAndVitals: "",
        serviceHealthIssue: ""
      },
      sortByValue: "",
      selectedAreaOffice: areaOfficesFixture[0],
      closestAreaOffice: areaOfficesFixture[0]
    };
    _mountedPrint = undefined;
  });

  it("passes axe tests", async () => {
    let html = mountedPrint().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("parses url correctly", () => {
    props.url.query["patronType"] = "service-person";
    props.url.query["serviceType"] = "WSV (WWII or Korea)";
    props.url.query["statusAndVitals"] = "releasedAlive";
    props.url.query["serviceHealthIssue"] = "true";
    props.url.query["needs"] = "0,1";

    expect(
      mountedPrint()
        .find(".profile_section")
        .text()
    ).toContain("service-person");

    expect(
      mountedPrint()
        .find(".profile_section")
        .text()
    ).toContain("WSV (WWII or Korea)");

    expect(
      mountedPrint()
        .find(".profile_section")
        .text()
    ).toContain("releasedAlive");

    expect(
      mountedPrint()
        .find(".profile_section")
        .text()
    ).toContain("GE.has service related health issue");

    expect(
      mountedPrint()
        .find(".needs_section")
        .text()
    ).toContain("1");
  });

  it("has a correct sortBenefits function when sorting by popularity", () => {
    let BLInstance = mountedPrint().instance();
    expect(
      BLInstance.sortBenefits(benefitsFixture, "en", "popularity").map(
        b => b.id
      )
    ).toEqual(["3", "1", "0"]);
  });

  it("has a correct sortBenefits function when sorting alphabetically", () => {
    let BLInstance = mountedPrint().instance();
    expect(
      BLInstance.sortBenefits(benefitsFixture, "en", "alphabetical").map(
        b => b.id
      )
    ).toEqual(["1", "0", "3"]);
  });

  it("renders benefits correctly", () => {
    props.url.query["benefits"] = "0,3";
    expect(mountedPrint().find(".benefitsListItem").length).toEqual(2);
  });

  it("includes the address for the closest area office", () => {
    expect(
      mountedPrint()
        .find("#closest_office_info")
        .html()
    ).toContain("address_en");
  });
});

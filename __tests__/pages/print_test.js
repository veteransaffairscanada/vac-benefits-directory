/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";
import { Print } from "../../pages/print";
import benefitsFixture from "../fixtures/benefits";
import elegibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";

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
      text: [],
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: key => {
        return key == "current-language-code" ? "en" : key;
      },
      benefits: benefitsFixture,
      eligibilityPaths: elegibilityPathsFixture,
      selectedNeeds: {},
      needs: needsFixture,
      examples: [],
      selectedEligibility: {
        serviceType: "",
        patronType: "",
        statusAndVitals: ""
      },
      sortByValue: ""
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
    props.url.query["needs"] = "0,1";
    expect(mountedPrint().find(".needsListItem").length).toEqual(2);
    expect(
      mountedPrint()
        .find(".eligibilityListItem")
        .find("b")
        .text()
    ).toEqual("service-person");
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
});

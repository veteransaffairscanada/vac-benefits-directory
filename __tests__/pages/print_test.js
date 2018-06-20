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
      }
    };
    _mountedPrint = undefined;
  });

  it("passes axe tests", async () => {
    let html = mountedPrint().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("renders BenefitList component", () => {
    expect(mountedPrint().find("BenefitList").length).toEqual(1);
  });

  it("parses url correctly", () => {
    props.url.query["patronType"] = "service-person";
    props.url.query["serviceType"] = "WSV%20(WWII%20or%20Korea)";
    props.url.query["statusAndVitals"] = "releasedAlive";
    props.url.query["needs"] = "43534534,43534ewr534";
    expect(
      mountedPrint()
        .find(".needsList")
        .find("li").length
    ).toEqual(2);

    expect(
      mountedPrint()
        .find(".eligibilityList")
        .find("li").length
    ).toEqual(3);
  });
});

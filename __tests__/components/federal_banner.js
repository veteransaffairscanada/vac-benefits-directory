import React from "react";
import FederalBanner from "../../components/federal_banner";
import { mount } from "enzyme";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("FederalBanner", () => {
  let props;
  let _mountedFederalBanner;
  const mountedFederalBanner = () => {
    if (!_mountedFederalBanner) {
      _mountedFederalBanner = mount(<FederalBanner {...props} />);
    }
    return _mountedFederalBanner;
  };

  beforeEach(() => {
    props = {
      i18n: {
        changeLanguage: () => {}
      },
      t: key => {
        return key == "current-language-code" ? "en" : key;
      }
    };
    _mountedFederalBanner = undefined;
  });

  // Tests
  it("passes axe tests", async () => {
    let html = mountedFederalBanner().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows the change language button", () => {
    expect(
      mountedFederalBanner()
        .find("#changeLanguage")
        .at(0)
        .text()
    ).toEqual("other-language");
  });

  it("refresh cache button shown if showRefreshCache is true", () => {
    props.showRefreshCache = true;
    expect(
      mountedFederalBanner()
        .find("#refreshCache")
        .first().length
    ).toEqual(1);
  });

  it("refresh cache button not shown if showRefreshCache is false", () => {
    props.showRefreshCache = false;
    expect(
      mountedFederalBanner()
        .find("#refreshCache")
        .first().length
    ).toEqual(0);
  });
});

import React from "react";
import FederalBanner from "../../components/federal_banner";
import { mount } from "enzyme";
import translate from "../fixtures/translate";

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
      t: translate,
      showRefreshCache: false,
      skipLink: ".svg-container",
      url: {
        push: jest.fn(),
        query: { patronType: "veteran" },
        route: "benefits-directory"
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
});

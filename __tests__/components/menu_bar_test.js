import React from "react";
import MenuBar from "../../components/menu_bar";
import { mount } from "enzyme";
import Router from "next/router";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("MenuBar", () => {
  Router.router = {
    push: jest.fn(),
    query: jest.fn(),
    pathname: ""
  };

  let props;
  let _mountedMenuBar;
  const mountedMenuBar = () => {
    if (!_mountedMenuBar) {
      _mountedMenuBar = mount(<MenuBar {...props} />);
    }
    return _mountedMenuBar;
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
    _mountedMenuBar = undefined;
  });

  // Tests
  it("passes axe tests", async () => {
    let html = mountedMenuBar().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows the change language button", () => {
    expect(
      mountedMenuBar()
        .find("#changeLanguage")
        .at(0)
        .text()
    ).toEqual("other-language");
  });

  describe("clicking the change language button", () => {
    let _currentLanguage = "en";
    beforeEach(() => {
      props.i18n = {
        changeLanguage: langCode => {
          _currentLanguage = langCode;
        }
      };
      props.t = s => {
        return s + "_" + _currentLanguage;
      };
    });

    it("changes the text on the change language button", () => {
      mountedMenuBar()
        .find("#changeLanguage")
        .at(0)
        .simulate("click");
      expect(
        mount(<MenuBar {...props} />)
          .find("#changeLanguage")
          .at(0)
          .text()
      ).toEqual("other-language_other-language-code_en");
    });
  });

  it("Language change logged with Google Analytics", () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    mountedMenuBar()
      .find("#changeLanguage")
      .at(0)
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Language change",
      "other-language"
    );
  });

  it("refresh cache button shown if showRefreshCache is true", () => {
    props.showRefreshCache = true;
    expect(
      mountedMenuBar()
        .find("#refreshCache")
        .first().length
    ).toEqual(1);
  });
});

import React from "react";
import LanguageButton from "../../components/language_button";
import { mount } from "enzyme";
import Router from "next/router";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("LanguageButton", () => {
  Router.router = {
    push: jest.fn(),
    query: jest.fn(),
    pathname: ""
  };

  let props;
  let _mountedLanguageButton;
  const mountedLanguageButton = () => {
    if (!_mountedLanguageButton) {
      _mountedLanguageButton = mount(<LanguageButton {...props} />);
    }
    return _mountedLanguageButton;
  };

  beforeEach(() => {
    props = {
      classes: {},
      i18n: {
        changeLanguage: () => {}
      },
      t: key => {
        return key === "current-language-code" ? "en" : key;
      }
    };
    _mountedLanguageButton = undefined;
  });

  // Tests
  it("passes axe tests", async () => {
    let html = mountedLanguageButton().html();
    expect(await axe(html)).toHaveNoViolations();
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
      mountedLanguageButton()
        .find("#changeLanguage")
        .at(0)
        .simulate("click");
      expect(
        mount(<LanguageButton {...props} />)
          .find("#changeLanguage")
          .at(0)
          .text()
      ).toEqual("other-language_other-language-code_en");
    });
  });

  it("Language change logged with Google Analytics", () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    mountedLanguageButton()
      .find("#changeLanguage")
      .at(0)
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Language change",
      "other-language"
    );
  });
});

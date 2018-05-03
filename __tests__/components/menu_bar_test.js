import React from "react";
import MenuBar from "../../components/menu_bar";
import { mount } from "enzyme";

jest.mock("react-ga");

describe("MenuBar", () => {
  // Setup

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
      t: key => key
    };
    _mountedMenuBar = undefined;
  });

  // Tests

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
});

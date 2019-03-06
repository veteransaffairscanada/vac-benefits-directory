import React from "react";
import LanguageButton from "../../components/language_button";
import { mount } from "enzyme";
import translate from "../fixtures/translate";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
jest.mock("react-ga");

describe("LanguageButton", () => {
  let props;

  beforeEach(() => {
    props = {
      i18n: {
        changeLanguage: () => {}
      },
      t: translate,
      url: {
        push: jest.fn(),
        query: { patronType: "veteran" },
        route: "benefits-directory"
      }
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<LanguageButton {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has the correct href", () => {
    expect(
      mount(<LanguageButton {...props} />)
        .find("#changeLanguage")
        .at(0)
        .prop("href")
    ).toEqual("benefits-directory?patronType=veteran&lng=fr");
  });

  it("Language change logged with Google Analytics", () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    mount(<LanguageButton {...props} />)
      .find("#changeLanguage")
      .at(0)
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Language change",
      "other-language"
    );
  });
});

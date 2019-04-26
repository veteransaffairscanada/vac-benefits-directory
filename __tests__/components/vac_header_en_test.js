import React from "react";
import VacHeaderEn from "../../components/vac_header_en";
import { mount } from "enzyme";
import translate from "../fixtures/translate";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
jest.mock("react-ga");

describe("VacHeaderEn", () => {
  let props;

  beforeEach(() => {
    props = {
      t: translate,
      url: {
        push: jest.fn(),
        query: { patronType: "veteran" },
        route: "benefits-directory"
      }
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<VacHeaderEn {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has the correct href", () => {
    expect(
      mount(<VacHeaderEn {...props} />)
        .find("#changeLanguage")
        .at(0)
        .prop("href")
    ).toEqual("benefits-directory?patronType=veteran&lng=fr");
  });

  it("Language change logged with Google Analytics", () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    mount(<VacHeaderEn {...props} />)
      .find("#changeLanguage")
      .at(0)
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Language change",
      "other-language"
    );
  });
});

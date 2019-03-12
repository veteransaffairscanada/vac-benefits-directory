import React from "react";
import VacHeaderFr from "../../components/vac_header_fr";
import { mount } from "enzyme";
import translate from "../fixtures/translate";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
jest.mock("react-ga");

describe("VacHeaderFr", () => {
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
    let html = mount(<VacHeaderFr {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has the correct href", () => {
    expect(
      mount(<VacHeaderFr {...props} />)
        .find("#changeLanguage")
        .at(0)
        .prop("href")
    ).toEqual("benefits-directory?patronType=veteran&lng=fr");
  });

  it("Language change logged with Google Analytics", () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    mount(<VacHeaderFr {...props} />)
      .find("#changeLanguage")
      .at(0)
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Language change",
      "other-language"
    );
  });
});

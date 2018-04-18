/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";

import { App } from "../../pages/A1";

jest.mock("react-ga");

describe("Page A1", () => {
  it("Instructions", () => {
    const app = mount(
      <App i18n={{ language: "en-US" }} t={key => key} vacServices={[]} />
    );
    expect(app.text()).toMatch(/A1.What services are you interested in?/);
    expect(app.text()).toMatch(/A1.Select all that apply/);
  });

  it("Buttons", () => {
    const testVacServices = [
      "Financial Support",
      "Rehabilitation",
      "Mental Health Services",
      "Health Care",
      "Career Transition",
      "Support for Families"
    ];
    const app = mount(
      <App
        i18n={{ language: "en-US" }}
        t={key => key}
        vacServices={testVacServices}
      />
    );
    const buttons = app.find("Button");
    const expectedText = [
      "other-language",
      "A1.Financial Support",
      "A1.Rehabilitation",
      "A1.Mental Health Services",
      "A1.Health Care",
      "A1.Career Transition",
      "A1.Support for Families",
      "A1.Next",
      "Privacy"
    ];
    expect(buttons.length).toEqual(9);
    buttons.map(function(button, index) {
      expect(button.text()).toEqual(expectedText[index]);
    });
  });

  it("Show All Benefits Link", () => {
    const app = mount(
      <App i18n={{ language: "en-US" }} t={key => key} vacServices={[]} />
    );
    expect(app.find("Link").text()).toEqual("Show All Benefits");
  });
});

/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";

import App from "../pages/desktop_A_1";

jest.mock("react-ga");
jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  translate: () => Component => props => <Component t={key => key} {...props} /> // eslint-disable-line react/display-name
}));

describe("Page A1", () => {
  it("Instructions", () => {
    const app = mount(<App i18n={{ language: "en-US" }} />);
    expect(app.text()).toMatch(/A1.What services are you interested in?/);
    expect(app.text()).toMatch(/A1.Select all that apply/);
  });

  it("Buttons", () => {
    const app = mount(<App i18n={{ language: "en-US" }} />);
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
    const app = mount(<App i18n={{ language: "en-US" }} />);
    expect(app.find("Link").text()).toEqual("A1.Show All Benefits");
  });
});

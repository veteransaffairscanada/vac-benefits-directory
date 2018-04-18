/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";

import { App } from "../../pages/A2";

jest.mock("react-ga");
jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  translate: () => Component => props => <Component t={key => key} {...props} /> // eslint-disable-line react/display-name
}));

describe("Page A2", () => {
  it("Instructions", () => {
    const app = mount(
      <App i18n={{ language: "en-US" }} t={key => key} userStatuses={[]} />
    );
    expect(app.text()).toMatch(/A2.What best describes your status?/);
  });

  it("Buttons", () => {
    const userStatuses = ["Veteran", "Family", "Not Sure"];
    const app = mount(
      <App
        i18n={{ language: "en-US" }}
        t={key => key}
        userStatuses={userStatuses}
      />
    );
    const buttons = app.find("Button");
    const expectedText = [
      "other-language",
      "A2.Veteran",
      "A2.Family",
      "A2.Not Sure",
      "A2.See Results",
      "Privacy"
    ];
    expect(buttons.length).toEqual(6);
    buttons.map(function(button, index) {
      expect(button.text()).toEqual(expectedText[index]);
    });
  });

  it("Show All Benefits Link", () => {
    const app = mount(
      <App i18n={{ language: "en-US" }} t={key => key} userStatuses={[]} />
    );
    expect(app.find("Link").text()).toEqual("Show All Benefits");
  });
});

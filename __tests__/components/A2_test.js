/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";

import { App } from "../../components/A2";

const patronTypesFixture = [
  {
    id: "rec726lY5vUBEh2Sv",
    name_en: "Military Service-Person",
    name_fr: "Service militaire-Personne"
  },
  {
    id: "recDAuNt8DXhD88Mr",
    name_en: "RCMP Service-Person",
    name_fr: "Personne-Service de la GRC"
  }
];

jest.mock("react-ga");
jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  translate: () => Component => props => <Component t={key => key} {...props} /> // eslint-disable-line react/display-name
}));

describe("Page A2", () => {
  it("Instructions", () => {
    const app = mount(
      <App
        i18n={{ language: "en-US" }}
        t={key => key}
        storeHydrated={true}
        patronTypes={[]}
      />
    );
    expect(app.text()).toMatch(/A2.What best describes your status?/);
  });

  it("Buttons", () => {
    const app = mount(
      <App
        i18n={{ language: "en-US" }}
        t={key => key}
        storeHydrated={true}
        patronTypes={patronTypesFixture}
        selectedPatronTypes={[]}
        switchSection={jest.fn()}
      />
    );
    const buttons = app.find("Button");
    const expectedText = [
      "Service militaire-Personne",
      "Personne-Service de la GRC",
      "A2.See Results"
    ];
    expect(buttons.length).toEqual(3);
    buttons.map(function(button, index) {
      expect(button.text()).toEqual(expectedText[index]);
    });
  });

  it("Show All Benefits Link", () => {
    const app = mount(
      <App
        i18n={{ language: "en-US" }}
        t={key => key}
        storeHydrated={true}
        patronTypes={[]}
      />
    );
    expect(app.find(".AllBenefits").text()).toEqual("Show All Benefits");
  });
});

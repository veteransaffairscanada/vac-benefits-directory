/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";

import { App } from "../../pages/A1";

jest.mock("react-ga");

const benefitTypesFixture = [
  {
    id: "rec3PfnqeqyxSbx1x",
    name_en: "Compensation For Harm",
    name_fr: "Compensation Pour Préjudice"
  },
  {
    id: "recQO4AHswOl75poF",
    name_en: "Healthcare Cost Coverage",
    name_fr: "Couverture des Coûts de Soins de Santé"
  }
];

describe("Page A1", () => {
  it("Instructions", () => {
    const app = mount(
      <App
        i18n={{ language: "en-US" }}
        t={key => key}
        storeHydrated={true}
        benefitTypes={[]}
      />
    );
    expect(app.text()).toMatch(/A1.What services are you interested in?/);
    expect(app.text()).toMatch(/A1.Select all that apply/);
  });

  it("Buttons", () => {
    const app = mount(
      <App
        i18n={{ language: "en-US" }}
        t={key => key}
        storeHydrated={true}
        benefitTypes={benefitTypesFixture}
      />
    );
    const buttons = app.find("Button");
    const expectedText = [
      "other-language",
      "Compensation Pour Préjudice",
      "Couverture des Coûts de Soins de Santé",
      "A1.Next",
      "Privacy"
    ];
    expect(buttons.length).toEqual(5);
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
        benefitTypes={[]}
      />
    );
    expect(app.find("Link").text()).toEqual("Show All Benefits");
  });
});

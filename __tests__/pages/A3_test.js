/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";

import { App } from "../../pages/A3";

const tMocked = key => key;
const i18nFixture = { language: "en-US" };
const selectedFixture = ["Financial Support", "Rehabilitation"];
const userFixture = ["Veteran", "Family"];
const urlFixture = {
  query: {
    selected: selectedFixture.join(),
    user: userFixture.join()
  }
};

const benefitListFixture = [
  {
    type: "Support for Families",
    title: "Survivor's Pension",
    description: "Survivor's Pension Description"
  },
  {
    type: "Financial Support",
    title: "Disability Award",
    description: "Disability Award Description"
  }
];

jest.mock("react-ga");

describe("Page A3", () => {
  it("Benefit count string no benefits", () => {
    const app = mount(
      <App i18n={i18nFixture} t={tMocked} benefitList={[]} url={urlFixture} />
    );
    expect(app.find("p#benefitCountString").text()).toEqual(
      "A3.Based on your selections you do not qualify for any benefits at this time"
    );
  });

  it("Benefit count string 1 benefit", () => {
    const app = mount(
      <App
        i18n={i18nFixture}
        t={tMocked}
        benefitList={[benefitListFixture[0]]}
        url={urlFixture}
      />
    );
    expect(app.find("p#benefitCountString").text()).toEqual(
      "A3.Here is a benefit that may apply to you:"
    );
  });

  it("Benefit count string 2 benefits", () => {
    const app = mount(
      <App
        i18n={i18nFixture}
        t={tMocked}
        benefitList={benefitListFixture}
        url={urlFixture}
      />
    );
    expect(app.find("p#benefitCountString").text()).toEqual(
      "A3.Here are NNN benefits that may apply to you:"
    );
  });

  it("Selected Options", () => {
    const app = mount(
      <App i18n={i18nFixture} t={tMocked} benefitList={[]} url={urlFixture} />
    );
    const expectedText = selectedFixture
      .map(s => {
        return "A1." + s;
      })
      .join("");
    expect(app.find("SelectedOptionsCard#vacServicesCard").text()).toEqual(
      expectedText
    );
  });

  it("Selected user types", () => {
    const app = mount(
      <App i18n={i18nFixture} t={tMocked} benefitList={[]} url={urlFixture} />
    );
    const expectedText = userFixture
      .map(s => {
        return "A2." + s;
      })
      .join("");
    expect(app.find("SelectedOptionsCard#userStatusesCard").text()).toEqual(
      expectedText
    );
  });
});

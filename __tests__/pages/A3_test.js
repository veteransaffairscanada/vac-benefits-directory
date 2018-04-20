/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";

import { App } from "../../pages/A3";

const tMocked = key => key;
const i18nFixture = { language: "en-US" };
const selectedFixture = ["rec3PfnqeqyxSbx1x", "recQO4AHswOl75poF"];
const userFixture = ["rec726lY5vUBEh2Sv", "recDAuNt8DXhD88Mr"];
const urlFixture = {
  query: {
    selected: selectedFixture.join(),
    user: userFixture.join()
  }
};

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

const benefitsFixture = [
  {
    patron_types: ["rec726lY5vUBEh2Sv"],
    benefit_types: ["rec3PfnqeqyxSbx1x"],
    id: "recQtMLSsyS90o4rV",
    vac_name_en: "Disability Award",
    vac_name_fr: "Prix ​​d'invalidité"
  },
  {
    patron_types: ["rec726lY5vUBEh2Sv"],
    benefit_types: ["rec3PfnqeqyxSbx1x"],
    id: "recvzRaT9ormprNkb",
    vac_name_en: "Disability Pension",
    vac_name_fr: "Pension d'invalidité"
  }
];

jest.mock("react-ga");

describe("Page A3", () => {
  it("Benefit count string no benefits", () => {
    const app = mount(
      <App
        i18n={i18nFixture}
        t={tMocked}
        storeHydrated={true}
        benefitTypes={[]}
        patronTypes={[]}
        benefits={[]}
        url={urlFixture}
      />
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
        storeHydrated={true}
        benefitTypes={benefitTypesFixture}
        patronTypes={patronTypesFixture}
        benefits={[benefitsFixture[0]]}
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
        storeHydrated={true}
        benefitTypes={benefitTypesFixture}
        patronTypes={patronTypesFixture}
        benefits={benefitsFixture}
        url={urlFixture}
      />
    );
    expect(app.find("p#benefitCountString").text()).toEqual(
      "A3.Here are NNN benefits that may apply to you:"
    );
  });

  it("Selected Options", () => {
    const app = mount(
      <App
        i18n={i18nFixture}
        t={tMocked}
        storeHydrated={true}
        benefitTypes={benefitTypesFixture}
        patronTypes={patronTypesFixture}
        benefits={[]}
        url={urlFixture}
      />
    );
    const expectedText = benefitTypesFixture
      .map(bt => {
        return bt.name_fr;
      })
      .join("");
    expect(app.find("SelectedOptionsCard#vacServicesCard").text()).toEqual(
      expectedText
    );
  });

  it("Selected user types", () => {
    const app = mount(
      <App
        i18n={i18nFixture}
        t={tMocked}
        storeHydrated={true}
        benefitTypes={benefitTypesFixture}
        patronTypes={patronTypesFixture}
        benefits={[]}
        url={urlFixture}
      />
    );
    const expectedText = patronTypesFixture
      .map(pt => {
        return pt.name_fr;
      })
      .join("");
    expect(app.find("SelectedOptionsCard#userStatusesCard").text()).toEqual(
      expectedText
    );
  });
});

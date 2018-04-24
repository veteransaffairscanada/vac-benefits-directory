/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";

import { AllBenefits } from "../../pages/all-benefits";
import { BenefitTitleCardList } from "../../components/benefit_cards";

const tMocked = key => key;
const i18nFixture = { language: "en-US" };

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

describe("All benefits page", () => {
  it("shows a list of all benefits available", () => {
    const app = mount(
      <AllBenefits
        i18n={i18nFixture}
        t={tMocked}
        storeHydrated={true}
        benefits={benefitsFixture}
      />
    );
    expect(app.find("BenefitTitleCardList").length).toEqual(1);
    expect(app.find(".BenefitCard h2").length).toEqual(2);
  });
});

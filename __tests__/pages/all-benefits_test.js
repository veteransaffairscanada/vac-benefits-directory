/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";

import { AllBenefits } from "../../pages/all-benefits";
import { benefitsFixture } from "../fixtures/benefits";

const tMocked = key => key;
const i18nFixture = { language: "en-US" };

const corporaEnFixture = [];
const corporaFrFixture = [];
const benefitTypesFixture = [];

jest.mock("react-ga");

describe("All benefits page", () => {
  it("shows a list of all benefits available", () => {
    const app = mount(
      <AllBenefits
        i18n={i18nFixture}
        t={tMocked}
        storeHydrated={true}
        benefits={benefitsFixture}
        corporaEn={corporaEnFixture}
        corporaFr={corporaFrFixture}
        benefitTypes={benefitTypesFixture}
      />
    );
    expect(app.find("Card").length).toEqual(2);
  });
});

/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";

import { AllBenefits } from "../../pages/all-benefits";
import { benefitsFixture } from "../fixtures/benefits";
import benefitTypesFixture from "../fixtures/benefit_types";
import { corporaEnFixture, corporaFrFixture } from "../fixtures/corpora";

jest.mock("react-ga");

describe("AllBenefits", () => {
  let props;
  let _mountedAllBenefits;

  const mountedAllBenefits = () => {
    if (!_mountedAllBenefits) {
      _mountedAllBenefits = shallow(<AllBenefits {...props} />);
    }
    return _mountedAllBenefits;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      i18n: {},
      storeHydrated: true,
      loadDataStore: jest.fn(),
      benefitTypes: benefitTypesFixture,
      benefits: benefitsFixture,
      corporaEn: corporaEnFixture,
      corporaFr: corporaFrFixture
    };
    _mountedAllBenefits = undefined;
  });

  it("componentWillMount does not run fetchFromAirtable if storeHydrated = true", () => {
    let airtable = require("../../utils/airtable");
    airtable.fetchFromAirtable = jest.fn();
    mountedAllBenefits();
    expect(airtable.fetchFromAirtable).not.toBeCalled();
  });

  it("componentWillMount does run fetchFromAirtable if storeHydrated = false", () => {
    props.storeHydrated = false;
    let airtable = require("../../utils/airtable");
    airtable.fetchFromAirtable = jest.fn();
    mountedAllBenefits();
    expect(airtable.fetchFromAirtable).toBeCalled();
  });

  it("has a correct enrichBenefit function", () => {
    let expectedBenefit = Object.assign({}, benefitsFixture[0]);
    expectedBenefit.linkEn = corporaEnFixture[0].full_description_link;
    expectedBenefit.linkFr = corporaFrFixture[0].full_description_link;
    expectedBenefit.descriptionEn = corporaEnFixture[0].one_line_description;
    expectedBenefit.descriptionFr = corporaFrFixture[0].one_line_description;
    expectedBenefit.benefitTypeEn = benefitTypesFixture[0].name_en;
    expectedBenefit.benefitTypeFr = benefitTypesFixture[0].name_fr;

    const AllBenefitsInstance = mountedAllBenefits().instance();
    expect(
      AllBenefitsInstance.enrichBenefit(
        benefitsFixture[0],
        benefitTypesFixture,
        corporaEnFixture,
        corporaFrFixture
      )
    ).toEqual(expectedBenefit);
  });

  it("shows the list of all benefits available", () => {
    expect(mountedAllBenefits().find("BenefitCard").length).toEqual(2);
    mountedAllBenefits()
      .find("BenefitCard")
      .map((bc, i) => {
        expect(bc.props().benefit.vac_name_en).toEqual(
          benefitsFixture[i].vac_name_en
        );
      });
  });
});

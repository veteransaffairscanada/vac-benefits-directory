/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";

import { AllBenefits } from "../../pages/all-benefits";
import benefitsFixture from "../fixtures/benefits";

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
      benefits: benefitsFixture
    };
    _mountedAllBenefits = undefined;
  });

  it("shows the list of all benefits available", () => {
    expect(mountedAllBenefits().find(".benefitCard").length).toEqual(3);
    mountedAllBenefits()
      .find("BenefitCard")
      .map((bc, i) => {
        expect(bc.props().benefit.vac_name_en).toEqual(
          benefitsFixture[i].vac_name_en
        );
      });
  });
});

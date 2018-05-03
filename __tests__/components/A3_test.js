/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";

import A3 from "../../components/A3";
import { benefitsFixture } from "../fixtures/benefits";
import benefitTypesFixture from "../fixtures/benefit_types";
import patronTypesFixture from "../fixtures/patron_types";
import { corporaEnFixture, corporaFrFixture } from "../fixtures/corpora";

jest.mock("react-ga");

describe("A3", () => {
  let props;
  let _mountedA3;

  const mountedA3 = () => {
    if (!_mountedA3) {
      _mountedA3 = shallow(<A3 {...props} />);
    }
    return _mountedA3;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      benefitTypes: benefitTypesFixture,
      patronTypes: patronTypesFixture,
      benefits: benefitsFixture,
      corporaEn: corporaEnFixture,
      corporaFr: corporaFrFixture,
      selectedBenefitTypes: [],
      selectedPatronTypes: [],
      switchSection: jest.fn()
    };
    _mountedA3 = undefined;
  });

  it("has a correct countBenefitsString function", () => {
    let A3Instance = mountedA3().instance();
    expect(A3Instance.countBenefitsString([], props.t)).toEqual(
      "A3.At this time there are no benefits that match your selections"
    );
    expect(
      A3Instance.countBenefitsString([benefitsFixture[0]], props.t)
    ).toEqual("A3.Here is a benefit that may apply to you:");
    expect(A3Instance.countBenefitsString(benefitsFixture, props.t)).toEqual(
      "A3.Here are NNN benefits that may apply to you:"
    );
  });

  it("has a correct filterBenefits function", () => {
    const benefitTypeIDs = benefitTypesFixture.map(bt => bt.id);
    const patronTypeIDs = patronTypesFixture.map(pt => pt.id);
    let A3Instance = mountedA3().instance();
    expect(
      A3Instance.filterBenefits(benefitsFixture, benefitTypeIDs, patronTypeIDs)
    ).toEqual(benefitsFixture);
    expect(
      A3Instance.filterBenefits(benefitsFixture, [], patronTypeIDs)
    ).toEqual([]);
    expect(
      A3Instance.filterBenefits(benefitsFixture, benefitTypeIDs, [])
    ).toEqual([]);
    expect(
      A3Instance.filterBenefits(
        benefitsFixture,
        benefitTypeIDs.slice(0, 1),
        patronTypeIDs
      )
    ).toEqual(benefitsFixture.slice(0, 1));
    expect(
      A3Instance.filterBenefits(
        benefitsFixture,
        benefitTypeIDs,
        patronTypeIDs.slice(1, 2)
      )
    ).toEqual(benefitsFixture.slice(1, 2));
  });

  it("has a correct enrichBenefit function", () => {
    let expectedBenefit = Object.assign({}, benefitsFixture[0]);
    expectedBenefit.linkEn = corporaEnFixture[0].full_description_link;
    expectedBenefit.linkFr = corporaFrFixture[0].full_description_link;
    const A3Instance = mountedA3().instance();
    expect(
      A3Instance.enrichBenefit(
        benefitsFixture[0],
        corporaEnFixture,
        corporaFrFixture
      )
    ).toEqual(expectedBenefit);
  });

  it("shows the countBenefitsString", () => {
    expect(
      mountedA3()
        .find("#benefitCountString")
        .text()
    ).toEqual(
      "A3.At this time there are no benefits that match your selections"
    );
  });

  it("has a selectedBenefitTypes", () => {
    props.selectedBenefitTypes = benefitTypesFixture.map(bt => bt.id);
    const card = mountedA3().find("#vacServicesCard");
    expect(card.prop("page")).toEqual("A1");
    expect(card.prop("options")).toEqual(
      benefitTypesFixture.map(bt => bt.name_fr)
    );
  });

  it("has a selectedPatronTypes", () => {
    props.selectedPatronTypes = patronTypesFixture.map(bt => bt.id);
    const card = mountedA3().find("#userStatusesCard");
    expect(card.prop("page")).toEqual("A2");
    expect(card.prop("options")).toEqual(
      patronTypesFixture.map(pt => pt.name_fr)
    );
  });

  it("has the selected benefit cards", () => {
    props.selectedBenefitTypes = benefitTypesFixture.map(bt => bt.id);
    props.selectedPatronTypes = patronTypesFixture.map(bt => bt.id);
    const benefitCards = mountedA3().find(".BenefitCards");
    expect(benefitCards.length).toEqual(2);
    benefitCards.map((bt, i) => {
      expect(bt.prop("benefit").vac_name_fr).toEqual(
        benefitsFixture[i].vac_name_fr
      );
    });
  });

  it("has an All Benefits Link", () => {
    expect(
      mountedA3()
        .find(".AllBenefits")
        .text()
    ).toEqual("Show All Benefits");
  });
});

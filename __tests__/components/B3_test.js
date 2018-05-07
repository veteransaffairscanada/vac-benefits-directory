/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";

import { B3 } from "../../components/B3";
import { benefitsFixture } from "../fixtures/benefits";
import benefitTypesFixture from "../fixtures/benefit_types";
import patronTypesFixture from "../fixtures/patron_types";
import { corporaEnFixture, corporaFrFixture } from "../fixtures/corpora";

jest.mock("react-ga");

describe("B3", () => {
  let props;
  let _mountedB3;

  const mountedB3 = () => {
    if (!_mountedB3) {
      _mountedB3 = shallow(<B3 {...props} />);
    }
    return _mountedB3;
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
      switchSection: jest.fn(),
      toggleSelectedPatronType: jest.fn(),
      toggleSelectedBenefitType: jest.fn(),
      classes: {
        card: "B3-card-87",
        media: "B3-media-88",
        actions: "B3-actions-89",
        expand: "B3-expand-90",
        expandOpen: "B3-expandOpen-91",
        avatar: "B3-avatar-92"
      }
    };
    _mountedB3 = undefined;
  });

  it("has a correct countBenefitsString function", () => {
    let B3Instance = mountedB3().instance();
    expect(B3Instance.countBenefitsString([], props.t)).toEqual(
      "A3.At this time there are no benefits that match your selections"
    );
    expect(
      B3Instance.countBenefitsString([benefitsFixture[0]], props.t)
    ).toEqual("A3.Here is a benefit that may apply to you:");
    expect(B3Instance.countBenefitsString(benefitsFixture, props.t)).toEqual(
      "A3.Here are NNN benefits that may apply to you:"
    );
  });

  it("has a correct filterBenefits function", () => {
    const benefitTypeIDs = benefitTypesFixture.map(bt => bt.id);
    const patronTypeIDs = patronTypesFixture.map(pt => pt.id);
    let B3Instance = mountedB3().instance();
    expect(
      B3Instance.filterBenefits(benefitsFixture, benefitTypeIDs, patronTypeIDs)
    ).toEqual(benefitsFixture);
    expect(
      B3Instance.filterBenefits(benefitsFixture, [], patronTypeIDs)
    ).toEqual([]);
    expect(
      B3Instance.filterBenefits(benefitsFixture, benefitTypeIDs, [])
    ).toEqual([]);
    expect(
      B3Instance.filterBenefits(
        benefitsFixture,
        benefitTypeIDs.slice(0, 1),
        patronTypeIDs
      )
    ).toEqual(benefitsFixture.slice(0, 1));
    expect(
      B3Instance.filterBenefits(
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
    expectedBenefit.descriptionEn = corporaEnFixture[0].one_line_description;
    expectedBenefit.descriptionFr = corporaFrFixture[0].one_line_description;
    expectedBenefit.benefitTypeEn = benefitTypesFixture[0].name_en;
    expectedBenefit.benefitTypeFr = benefitTypesFixture[0].name_fr;

    const B3Instance = mountedB3().instance();
    expect(
      B3Instance.enrichBenefit(
        benefitsFixture[0],
        benefitTypesFixture,
        corporaEnFixture,
        corporaFrFixture
      )
    ).toEqual(expectedBenefit);
  });

  it("shows the countBenefitsString", () => {
    expect(
      mountedB3()
        .find("#benefitCountString")
        .text()
    ).toEqual(
      "A3.At this time there are no benefits that match your selections"
    );
  });

  it("has a selectedBenefitTypes filter", () => {
    props.selectedBenefitTypes = ["1", "2"];
    expect(mountedB3().find("#benefitTypesFilter").length).toEqual(1);
  });
  it("has a selectedPatronTypes filter", () => {
    props.selectedBenefitTypes = ["1", "2"];
    expect(mountedB3().find("#patronTypesFilter").length).toEqual(1);
  });

  it("has the filters contained in a collapse component", () => {
    expect(
      mountedB3()
        .find("#collapseBlock")
        .find("#benefitTypesFilter").length
    ).toEqual(1);
    expect(
      mountedB3()
        .find("#collapseBlock")
        .find("#patronTypesFilter").length
    ).toEqual(1);
  });

  it("has the filter initially expanded", () => {
    expect(mountedB3().state().expanded).toEqual(true);
  });

  it("has a button to collapse / expand the filter", () => {
    mountedB3()
      .find("#expandButton")
      .simulate("click");
    expect(mountedB3().state().expanded).toEqual(false);
    mountedB3()
      .find("#expandButton")
      .simulate("click");
    expect(mountedB3().state().expanded).toEqual(true);
  });

  it("has the selected benefit cards", () => {
    props.selectedBenefitTypes = benefitTypesFixture.map(bt => bt.id);
    props.selectedPatronTypes = patronTypesFixture.map(bt => bt.id);
    const benefitCards = mountedB3().find(".BenefitCards");
    expect(benefitCards.length).toEqual(2);
    benefitCards.map((bt, i) => {
      expect(bt.prop("benefit").vac_name_fr).toEqual(
        benefitsFixture[i].vac_name_fr
      );
    });
  });

  it("has an All Benefits Link", () => {
    expect(
      mountedB3()
        .find(".AllBenefits")
        .text()
    ).toEqual("Show All Benefits");
  });
});

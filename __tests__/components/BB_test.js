/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";

import { BB } from "../../components/BB";
import benefitsFixture from "../fixtures/benefits";
import elegibilityPathsFixture from "../fixtures/eligibilityPaths";

jest.mock("react-ga");

describe("BB", () => {
  let props;
  let _mountedBB;

  const mounted_BB = () => {
    if (!_mountedBB) {
      _mountedBB = shallow(<BB {...props} />);
    }
    return _mountedBB;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      benefits: benefitsFixture,
      eligibilityPaths: elegibilityPathsFixture,
      selectedEligibility: {
        serviceType: { CAF: 1 },
        serviceStatus: { released: 1 },
        patronType: { ["service-person"]: 1 },
        servicePersonVitalStatus: { alive: 1 }
      },
      toggleSelectedEligibility: jest.fn(),
      classes: {
        card: "BB-card-87",
        media: "BB-media-88",
        actions: "BB-actions-89",
        expand: "BB-expand-90",
        expandOpen: "BB-expandOpen-91",
        avatar: "BB-avatar-92"
      }
    };
    _mountedBB = undefined;
  });

  it("has a correct filteredBenefits function", () => {
    let BBInstance = mounted_BB().instance();
    expect(
      BBInstance.filteredBenefits(
        benefitsFixture,
        elegibilityPathsFixture,
        props.selectedEligibility
      )
    ).toEqual([benefitsFixture[0]]);
  });

  it("has a serviceTypes filter", () => {
    expect(mounted_BB().find("#serviceTypeFilter").length).toEqual(1);
  });
  it("has a patronType filter", () => {
    expect(mounted_BB().find("#patronTypeFilter").length).toEqual(1);
  });

  it("has the filters contained in a collapse component", () => {
    expect(
      mounted_BB()
        .find("#collapseBlock")
        .find("#serviceTypeFilter").length
    ).toEqual(1);
    expect(
      mounted_BB()
        .find("#collapseBlock")
        .find("#patronTypeFilter").length
    ).toEqual(1);
  });

  it("has the filter initially expanded", () => {
    expect(mounted_BB().state().expanded).toEqual(true);
  });

  it("has a button to collapse / expand the filter", () => {
    mounted_BB()
      .find("#expandButton")
      .simulate("click");
    expect(mounted_BB().state().expanded).toEqual(false);
    mounted_BB()
      .find("#expandButton")
      .simulate("click");
    expect(mounted_BB().state().expanded).toEqual(true);
  });

  it("has the selected benefit cards", () => {
    const benefitCards = mounted_BB().find(".BenefitCards");
    expect(benefitCards.length).toEqual(1);
    benefitCards.map((bt, i) => {
      expect(bt.prop("benefit").vac_name_fr).toEqual(
        benefitsFixture[i].vac_name_fr
      );
    });
  });

  it("has an All Benefits Link", () => {
    expect(
      mounted_BB()
        .find(".AllBenefits")
        .text()
    ).toEqual("Show All Benefits");
  });
});

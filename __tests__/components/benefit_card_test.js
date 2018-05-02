import React from "react";
import { BenefitTitleCard, BenefitCard } from "../../components/benefit_cards";
import { mount } from "enzyme";
import { joinedBenefitsFixture } from "../fixtures/benefits";

describe("BenefitTitleCard", () => {
  // Setup

  let props;
  let _mountedBenefitTitleCard;
  const mountedBenefitTitleCard = () => {
    if (!_mountedBenefitTitleCard) {
      _mountedBenefitTitleCard = mount(<BenefitTitleCard {...props} />);
    }
    return _mountedBenefitTitleCard;
  };

  beforeEach(() => {
    props = {
      t: () => "en",
      benefit: joinedBenefitsFixture[0]
    };
    _mountedBenefitTitleCard = undefined;
  });

  it("contains a SelectButton", () => {
    expect(mountedBenefitTitleCard().find("SelectButton").length).toEqual(1);
  });

  it("has a blank target", () => {
    expect(
      mountedBenefitTitleCard()
        .find("SelectButton")
        .prop("target")
    ).toEqual("_blank");
  });

  it("has expected English text and href", () => {
    expect(
      mountedBenefitTitleCard()
        .find("SelectButton")
        .text()
    ).toEqual(joinedBenefitsFixture[0].vac_name_en);
    expect(
      mountedBenefitTitleCard()
        .find("SelectButton")
        .prop("href")
    ).toEqual(joinedBenefitsFixture[0].linkEn);
  });

  describe("when language is French", () => {
    beforeEach(() => {
      props.t = () => "fr";
    });

    it("has expected French text and href", () => {
      expect(
        mountedBenefitTitleCard()
          .find("SelectButton")
          .text()
      ).toEqual(joinedBenefitsFixture[0].vac_name_fr);
      expect(
        mountedBenefitTitleCard()
          .find("SelectButton")
          .prop("href")
      ).toEqual(joinedBenefitsFixture[0].linkFr);
    });
  });
});

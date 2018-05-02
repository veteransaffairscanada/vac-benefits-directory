import React from "react";
import { mount } from "enzyme";
import { BenefitTitleCard, BenefitCard } from "../../components/benefit_cards";
import { joinedBenefitsFixture } from "../fixtures/benefits";

describe("BenefitTitleCard", () => {
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

describe("BenefitCard", () => {
  let props;
  let _mountedBenefitCard;
  const mountedBenefitCard = () => {
    if (!_mountedBenefitCard) {
      _mountedBenefitCard = mount(<BenefitCard {...props} />);
    }
    return _mountedBenefitCard;
  };

  beforeEach(() => {
    props = {
      t: () => "en",
      benefit: joinedBenefitsFixture[0]
    };
    _mountedBenefitCard = undefined;
  });

  it("contains the benefit type", () => {
    expect(
      mountedBenefitCard()
        .find("CardHeader")
        .prop("title")
    ).toEqual(joinedBenefitsFixture[0].benefitTypeEn);
  });

  it("contains the name", () => {
    expect(
      mountedBenefitCard()
        .find(".cardTitle")
        .first()
        .text()
    ).toEqual(joinedBenefitsFixture[0].vac_name_en);
  });

  it("contains the description", () => {
    expect(
      mountedBenefitCard()
        .find(".cardDescription")
        .first()
        .text()
    ).toEqual(joinedBenefitsFixture[0].descriptionEn);
  });

  it("has a correctly configured button", () => {
    expect(
      mountedBenefitCard()
        .find("Button")
        .prop("target")
    ).toEqual("_blank");
    expect(
      mountedBenefitCard()
        .find("Button")
        .prop("href")
    ).toEqual(joinedBenefitsFixture[0].linkEn);
    expect(
      mountedBenefitCard()
        .find("Button")
        .text()
    ).toEqual("en");
  });

  describe("when language is French", () => {
    beforeEach(() => {
      props.t = () => "fr";
    });
    it("contains the French benefit type", () => {
      expect(
        mountedBenefitCard()
          .find("CardHeader")
          .prop("title")
      ).toEqual(joinedBenefitsFixture[0].benefitTypeFr);
    });

    it("contains the French name", () => {
      expect(
        mountedBenefitCard()
          .find(".cardTitle")
          .first()
          .text()
      ).toEqual(joinedBenefitsFixture[0].vac_name_fr);
    });

    it("contains the French description", () => {
      expect(
        mountedBenefitCard()
          .find(".cardDescription")
          .first()
          .text()
      ).toEqual(joinedBenefitsFixture[0].descriptionFr);
    });

    it("has a button with the French link", () => {
      expect(
        mountedBenefitCard()
          .find("Button")
          .prop("href")
      ).toEqual(joinedBenefitsFixture[0].linkFr);
      expect(
        mountedBenefitCard()
          .find("Button")
          .text()
      ).toEqual("fr");
    });
  });
});

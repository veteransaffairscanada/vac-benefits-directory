import React from "react";
import { mount } from "enzyme";
import { BenefitTitleCard, BenefitCard } from "../../components/benefit_cards";
import benefitsFixture from "../fixtures/benefits";

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
      benefit: benefitsFixture[0]
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
    ).toEqual(benefitsFixture[0].vacNameEn);
    expect(
      mountedBenefitTitleCard()
        .find("SelectButton")
        .prop("href")
    ).toEqual(benefitsFixture[0].benefitPageEn);
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
      ).toEqual(benefitsFixture[0].vacNameFr);
      expect(
        mountedBenefitTitleCard()
          .find("SelectButton")
          .prop("href")
      ).toEqual(benefitsFixture[0].benefitPageFr);
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
      benefit: benefitsFixture[0]
    };
    _mountedBenefitCard = undefined;
  });

  // it("contains the benefit type", () => {
  //   expect(
  //     mountedBenefitCard()
  //       .find("CardHeader")
  //       .prop("title")
  //   ).toEqual(benefitsFixture[0].benefitTypeEn);
  // });

  it("contains the name", () => {
    expect(
      mountedBenefitCard()
        .find(".cardTitle")
        .first()
        .text()
    ).toEqual(benefitsFixture[0].vacNameEn);
  });

  it("contains the description", () => {
    expect(
      mountedBenefitCard()
        .find(".cardDescription")
        .first()
        .text()
    ).toEqual("Benefit Description");
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
    ).toEqual(benefitsFixture[0].benefitPageEn);
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
    // it("contains the French benefit type", () => {
    //   expect(
    //     mountedBenefitCard()
    //       .find("CardHeader")
    //       .prop("title")
    //   ).toEqual(benefitsFixture[0].benefitTypeFr);
    // });

    it("contains the French name", () => {
      expect(
        mountedBenefitCard()
          .find(".cardTitle")
          .first()
          .text()
      ).toEqual(benefitsFixture[0].vacNameFr);
    });

    // it("contains the French description", () => {
    //   expect(
    //     mountedBenefitCard()
    //       .find(".cardDescription")
    //       .first()
    //       .text()
    //   ).toEqual(benefitsFixture[0].descriptionFr);
    // });

    it("has a button with the French link", () => {
      expect(
        mountedBenefitCard()
          .find("Button")
          .prop("href")
      ).toEqual(benefitsFixture[0].benefitPageFr);
      expect(
        mountedBenefitCard()
          .find("Button")
          .text()
      ).toEqual("fr");
    });
  });
});

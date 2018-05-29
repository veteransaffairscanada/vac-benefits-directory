import React from "react";
import { mount } from "enzyme";
import EmbeddedBenefitCard from "../../components/embedded_benefit_card";
import { BenefitCard } from "../../components/benefit_cards";
import benefitsFixture from "../fixtures/benefits";

describe("EmbeddedBenefitCard", () => {
  let props;
  let _mountedEmbeddedBenefitCard;
  const mountedEmbeddedBenefitCard = () => {
    if (!_mountedEmbeddedBenefitCard) {
      _mountedEmbeddedBenefitCard = mount(<EmbeddedBenefitCard {...props} />);
    }
    return _mountedEmbeddedBenefitCard;
  };

  beforeEach(() => {
    props = {
      t: () => "en",
      benefit: benefitsFixture[0]
    };
    _mountedEmbeddedBenefitCard = undefined;
  });

  it("contains a ExpansionPanel", () => {
    expect(mountedEmbeddedBenefitCard().find("ExpansionPanel").length).toEqual(
      1
    );
  });

  it("has a blank target", () => {
    expect(
      mountedEmbeddedBenefitCard()
        .find("ExpansionPanelActions")
        .find("Button")
        .prop("target")
    ).toEqual("_blank");
  });

  it("has expected English text and href", () => {
    expect(
      mountedEmbeddedBenefitCard()
        .find("ExpansionPanelSummary")
        .find("Typography")
        .text()
    ).toEqual(benefitsFixture[0].vacNameEn);
    expect(
      mountedEmbeddedBenefitCard()
        .find("ExpansionPanelActions")
        .find("Button")
        .prop("href")
    ).toEqual(benefitsFixture[0].benefitPageEn);
  });

  describe("when language is French", () => {
    beforeEach(() => {
      props.t = () => "fr";
    });

    it("has expected French text and href", () => {
      expect(
        mountedEmbeddedBenefitCard()
          .find("ExpansionPanelSummary")
          .find("Typography")
          .text()
      ).toEqual(benefitsFixture[0].vacNameFr);
      expect(
        mountedEmbeddedBenefitCard()
          .find("ExpansionPanelActions")
          .find("Button")
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
      benefit: benefitsFixture[0],
      allBenefits: benefitsFixture,
      classes: {
        card: "BB-card-87",
        media: "BB-media-88",
        actions: "BB-actions-89",
        expand: "BB-expand-90",
        expandOpen: "BB-expandOpen-91",
        avatar: "BB-avatar-92"
      }
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
        .find(".benefitName")
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
    ).toEqual("en");
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

  it("has embedded child benefit cards", () => {
    props.benefit = benefitsFixture[1];
    expect(mountedBenefitCard().text()).toContain(benefitsFixture[1].vacNameEn);
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
          .find(".benefitName")
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

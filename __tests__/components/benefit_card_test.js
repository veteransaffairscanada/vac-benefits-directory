import React from "react";
import { mount } from "enzyme";
import { EmbeddedBenefitCard } from "../../components/embedded_benefit_card";
import { BenefitCard } from "../../components/benefit_cards";
import benefitsFixture from "../fixtures/benefits";
import examplesFixture from "../fixtures/examples";

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
      benefit: benefitsFixture[0],
      classes: {},
      onRef: foo => foo
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
        .find("ExpansionPanelDetails")
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
        .find("ExpansionPanelDetails")
        .find("Button")
        .prop("href")
    ).toEqual(benefitsFixture[0].benefitPageEn);
    expect(
      mountedEmbeddedBenefitCard()
        .find("ExpansionPanelDetails")
        .find("Typography")
        .first()
        .text()
    ).toEqual("en");
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
          .find("ExpansionPanelDetails")
          .find("Button")
          .prop("href")
      ).toEqual(benefitsFixture[0].benefitPageFr);
    });
  });
  it("changes open state when somebody clicks on it", () => {
    expect(mountedEmbeddedBenefitCard().state().open).toEqual(false);
    mountedEmbeddedBenefitCard()
      .find("div > div")
      .at(0)
      .simulate("click");
    expect(mountedEmbeddedBenefitCard().state().open).toEqual(true);
  });
  it("Clicking the link logs an exit event", () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    mountedEmbeddedBenefitCard()
      .find("ExpansionPanelDetails")
      .find("Button")
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Exit",
      benefitsFixture[0].benefitPageEn
    );
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
      examples: examplesFixture,
      classes: {},
      onRef: foo => foo
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
    ).toEqual(benefitsFixture[0].oneLineDescriptionEn);
  });

  it("renders if there are examples", () => {
    props.t = key => key;
    props.benefit = benefitsFixture[0];
    expect(mountedBenefitCard().html()).toContain("examples:");
  });

  it("renders if there are no examples", () => {
    props.t = key => key;
    props.benefit = benefitsFixture[1];
    expect(mountedBenefitCard().html()).not.toContain("examples:");
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
  it("changes open state when somebody clicks on it", () => {
    expect(mountedBenefitCard().state().open).toEqual(false);
    mountedBenefitCard()
      .find("div > div > div")
      .at(0)
      .simulate("click");
    expect(mountedBenefitCard().state().open).toEqual(true);
  });
  it("Clicking the link logs an exit event", () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    mountedBenefitCard()
      .find("Button")
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Exit",
      benefitsFixture[0].benefitPageEn
    );
  });
});

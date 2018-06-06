import React from "react";
import { mount } from "enzyme";
import { EmbeddedBenefitCard } from "../../components/embedded_benefit_card";
import benefitsFixture from "../fixtures/benefits";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

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

  it("passes axe tests", async () => {
    let html = mountedEmbeddedBenefitCard().html();
    expect(await axe(html)).toHaveNoViolations();
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
    ).toEqual(benefitsFixture[0].oneLineDescriptionEn);
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
      expect(
        mountedEmbeddedBenefitCard()
          .find("ExpansionPanelDetails")
          .find("Typography")
          .first()
          .text()
      ).toEqual(benefitsFixture[0].oneLineDescriptionFr);
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

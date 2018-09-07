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
      onRef: foo => foo,
      showFavourite: false
    };
    _mountedEmbeddedBenefitCard = undefined;
    global.window.open = jest.fn();
  });

  it("passes axe tests", async () => {
    let html = mountedEmbeddedBenefitCard().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a blank target", () => {
    expect(
      mountedEmbeddedBenefitCard()
        .find("HeaderAnchorLink")
        .prop("target")
    ).toEqual("_blank");
  });

  it("has expected English text and href", () => {
    expect(mountedEmbeddedBenefitCard().text()).toContain(
      benefitsFixture[0].vacNameEn
    );
    expect(
      mountedEmbeddedBenefitCard()
        .find("HeaderAnchorLink")
        .prop("href")
    ).toEqual(benefitsFixture[0].benefitPageEn);
    expect(mountedEmbeddedBenefitCard().text()).toContain(
      benefitsFixture[0].oneLineDescriptionEn
    );
  });

  describe("when language is French", () => {
    beforeEach(() => {
      props.t = () => "fr";
    });

    it("has expected French text and href", () => {
      expect(mountedEmbeddedBenefitCard().text()).toContain(
        benefitsFixture[0].vacNameFr
      );
      expect(
        mountedEmbeddedBenefitCard()
          .find("HeaderAnchorLink")
          .prop("href")
      ).toEqual(benefitsFixture[0].benefitPageFr);
      expect(mountedEmbeddedBenefitCard().text()).toContain(
        benefitsFixture[0].oneLineDescriptionFr
      );
    });
  });

  it("Clicking the link logs an exit event", () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    mountedEmbeddedBenefitCard()
      .find("button")
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Exit",
      benefitsFixture[1].benefitPageEn
    );
  });
});

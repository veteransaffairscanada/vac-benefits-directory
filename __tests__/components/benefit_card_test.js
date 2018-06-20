import React from "react";
import { mount } from "enzyme";
import { BenefitCard } from "../../components/benefit_cards";
import benefitsFixture from "../fixtures/benefits";
import examplesFixture from "../fixtures/examples";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

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
      veteranBenefitIds: [],
      familyBenefitIds: [],
      examples: examplesFixture,
      classes: {},
      onRef: foo => foo,
      searchString: "",
      bookmarkedBenefits: []
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

  it("passes axe tests", async () => {
    let html = mountedBenefitCard().html();
    expect(await axe(html)).toHaveNoViolations();
  });

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
    props.benefit = benefitsFixture[1];
    expect(mountedBenefitCard().html()).toContain("examples:");
  });

  it("renders if there are no examples", () => {
    props.t = key => key;
    props.benefit = benefitsFixture[0];
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
    ).toEqual(benefitsFixture[1].benefitPageEn);
    expect(
      mountedBenefitCard()
        .find("Button")
        .text()
    ).toEqual("en");
  });

  it("has embedded Veteran child benefit card", () => {
    props.t = key => key;
    props.veteranBenefitIds = ["1"];
    expect(mountedBenefitCard().text()).not.toContain("Family child benefits");
    expect(mountedBenefitCard().text()).toContain("Veteran child benefits");
    expect(mountedBenefitCard().text()).toContain(benefitsFixture[1].vacNameFr);
  });

  it("has embedded family child benefit card", () => {
    props.t = key => key;
    props.familyBenefitIds = ["1"];
    expect(mountedBenefitCard().text()).not.toContain("Veteran child benefits");
    expect(mountedBenefitCard().text()).toContain("Family child benefits");
    expect(mountedBenefitCard().text()).toContain(benefitsFixture[1].vacNameFr);
  });

  describe("when language is French", () => {
    beforeEach(() => {
      props.t = () => "fr";
    });

    it("contains the French name", () => {
      expect(
        mountedBenefitCard()
          .find(".benefitName")
          .first()
          .text()
      ).toEqual(benefitsFixture[0].vacNameFr);
    });

    it("has a button with the French link", () => {
      expect(
        mountedBenefitCard()
          .find("Button")
          .prop("href")
      ).toEqual(benefitsFixture[1].benefitPageFr);
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

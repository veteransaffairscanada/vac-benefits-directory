import React from "react";
import BenefitCardList, {
  BenefitTitleCard,
  BenefitTitleCardList,
  BenefitCard
} from "../../components/benefit_cards";
import { mount } from "enzyme";

const benefitsFixture = [
  {
    vac_name_en: "Disability Award",
    vac_name_fr: "Prix ​​d'invalidité",
    benefitTypeEn: "BT EN 1",
    benefitTypeFr: "BT FR 1",
    descriptionEn: "Money compensation for a service related injury",
    descriptionFr: "Compensation monétaire pour une blessure liée au service",
    linkEn: "English link",
    linkFr: "French link"
  },
  {
    vac_name_en: "Disability Pension",
    vac_name_fr: "Pension d'invalidité",
    benefitTypeEn: "BT EN 2",
    benefitTypeFr: "BT FR 2",
    descriptionEn: "A pension compensating service related injuries",
    descriptionFr: "Une blessure compensant les blessures liées au service",
    linkEn: "English link",
    linkFr: "French link"
  }
];

describe("Test Benefit Cards", () => {
  it("BenefitTitleCard", () => {
    const card = mount(
      <BenefitTitleCard t={key => key} benefit={benefitsFixture[0]} />
    );
    expect(card.text()).toEqual(benefitsFixture[0].vac_name_fr);
  });

  it("BenefitTitleCardList", () => {
    const cardList = mount(
      <BenefitTitleCardList t={key => key} benefits={benefitsFixture} />
    );
    for (let i = 0; i < 2; i++) {
      const expected = benefitsFixture[i].vac_name_fr;
      expect(cardList.find("#bc" + i).text()).toEqual(expected);
    }
  });

  it("BenefitCard", () => {
    const test_props = benefitsFixture[0];
    const card = mount(<BenefitCard t={key => key} benefit={test_props} />);
    expect(card.find("CardHeader").text()).toEqual(
      test_props.benefitTypeFr.toUpperCase()
    );
    expect(card.find("Typography#title").text()).toEqual(
      test_props.vac_name_fr
    );
    expect(card.find("Typography#description").text()).toEqual(
      test_props.descriptionFr
    );
    expect(card.find("Button").text()).toEqual("View Details");
  });

  it("BenefitCardList", () => {
    const test_props = benefitsFixture;

    const cardList = mount(
      <BenefitCardList t={key => key} benefits={test_props} />
    );
    for (let i = 0; i < 2; i++) {
      const expected =
        test_props[i].benefitTypeFr.toUpperCase() +
        test_props[i].vac_name_fr +
        test_props[i].descriptionFr +
        "View Details";
      expect(cardList.find("#bc" + i).text()).toEqual(expected);
    }
  });
});

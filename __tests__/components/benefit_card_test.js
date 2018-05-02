import React from "react";
import { BenefitTitleCard, BenefitCard } from "../../components/benefit_cards";
import { mount } from "enzyme";
import { joinedBenefitsFixture } from "../fixtures/benefits";

describe("Test Benefit Cards", () => {
  it("BenefitTitleCard", () => {
    const card = mount(
      <BenefitTitleCard t={key => key} benefit={joinedBenefitsFixture[0]} />
    );
    expect(card.text()).toEqual(joinedBenefitsFixture[0].vac_name_fr);
  });

  it("BenefitCard", () => {
    const test_props = joinedBenefitsFixture[0];
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
});

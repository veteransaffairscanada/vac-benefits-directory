import React from "react";
import BenefitCardList, { BenefitCard } from "../components/benefit_cards";
import { mount } from "enzyme";

describe("Test Benefit Cards", () => {
  it("BenefitCard", () => {
    const test_props = {
      type: "test type",
      title: "test title",
      description: "test description"
    };
    const card = mount(<BenefitCard benefit={test_props} />);
    expect(card.find("CardHeader").text()).toEqual(test_props.type);
    expect(card.find("Typography#title").text()).toEqual(test_props.title);
    expect(card.find("Typography#description").text()).toEqual(
      test_props.description
    );
    expect(card.find("Button").text()).toEqual("View Details");
  });

  it("BenefitCardList", () => {
    const test_props = [
      {
        type: "test type1",
        title: "test title1",
        description: "test description1"
      },
      {
        type: "test type2",
        title: "test title2",
        description: "test description2"
      }
    ];

    const cardList = mount(<BenefitCardList benefitList={test_props} />);
    for (let i = 0; i < 2; i++) {
      const expected =
        test_props[i].type +
        test_props[i].title +
        test_props[i].description +
        "View Details";
      expect(cardList.find("#bc" + i).text()).toEqual(expected);
    }
  });
});

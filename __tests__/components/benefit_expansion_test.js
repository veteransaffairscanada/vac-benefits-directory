import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import { BenefitExpansion } from "../../components/benefit_expansion";
import benefitExamplesFixture from "../fixtures/benefitExamples";
import benefitsFixture from "../fixtures/benefits";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("BenefitExpansion", () => {
  let props;
  let mockStore, reduxData;
  const mocked_fn = jest.fn();
  mocked_fn.mockReturnValue({ focus: jest.fn() });
  window.open = mocked_fn;

  beforeEach(() => {
    props = {
      t: () => "en",
      benefit: benefitsFixture[0]
    };
    mockStore = configureStore();
    reduxData = {
      benefits: benefitsFixture,
      eligibilityPaths: eligibilityPathsFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      benefitExamples: benefitExamplesFixture
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(<BenefitExpansion {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows a child benefit title if the benefit has a child", () => {
    let related = mount(<BenefitExpansion {...props} {...reduxData} />);
    expect(
      related
        .find("ul")
        .last()
        .childAt(0)
        .text()
    ).toContain("en");
  });

  describe("getBenefitIds", () => {
    it("finds service person and family benefits", () => {
      expect(
        mount(<BenefitExpansion {...props} {...reduxData} />)
          .instance()
          .getBenefitIds(
            reduxData.eligibilityPaths,
            ["mco_p2", "mco_p3"],
            ["mco_p2"]
          )
      ).toEqual({
        veteran: new Set(["benefit_1", "benefit_2", "benefit_3"]),
        family: new Set(["benefit_2"])
      });
    });
  });

  it("has a correct getMatchingBenefits function", () => {
    expect(
      mount(<BenefitExpansion {...props} {...reduxData} />)
        .instance()
        .getMatchingBenefits(
          reduxData.benefits,
          new Set(["benefit_1", "benefit_99"])
        )
    ).toEqual([reduxData.benefits[1]]);
  });
});

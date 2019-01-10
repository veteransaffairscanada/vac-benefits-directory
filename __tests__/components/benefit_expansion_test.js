import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import eligibilityPathsFixture from "../fixtures/eligibility_paths_complex"; //eligibilityPaths";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options_complex";
import { BenefitExpansion } from "../../components/benefit_expansion";
import benefitExamplesFixture from "../fixtures/benefitExamples";
import needsFixture from "../fixtures/needs_complex";
import benefitsFixture from "../fixtures/benefits_complex";
import questionsFixture from "../fixtures/questions_complex";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("BenefitExpansion", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      t: () => "en",
      benefit: benefitsFixture.filter(
        x => x.vacNameEn === "Disability Pension"
      )[0]
    };
    mockStore = configureStore();
    reduxData = {
      benefits: benefitsFixture,
      eligibilityPaths: eligibilityPathsFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      benefitExamples: benefitExamplesFixture,
      needs: needsFixture,
      selectedNeeds: [],
      questions: questionsFixture,
      patronType: "veteran",
      serviceType: "CAF"
    };
    props.reduxState = reduxData;
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(<BenefitExpansion {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains the 2 ChildBenefitList components", () => {
    expect(
      mount(<BenefitExpansion {...props} {...reduxData} />).find(
        "ChildBenefitList"
      ).length
    ).toEqual(2);
  });

  it("contains the LearnMoreButton", () => {
    expect(
      mount(<BenefitExpansion {...props} {...reduxData} />).find(
        "LearnMoreButton"
      ).length
    ).toEqual(1);
  });

  it("shows a child benefit title if the benefit has a child", () => {
    let related = mount(<BenefitExpansion {...props} {...reduxData} />);
    const childBenefits = props.benefit.childBenefits;
    // console.log(childBenefits)
    expect(
      related
        .find("ul")
        .last()
        .childAt(0)
        .text()
    ).toContain(childBenefits[childBenefits.length].vacNameEn);
  });

  // describe("getAlsoEligibleBenefits", () => {
  //   it("the function returns the correct filtered child benefits", () => {
  //
  //     expect(
  //       mount(<BenefitExpansion {...props} {...reduxData} />)
  //         .instance()
  //         .getAlsoEligibleBenefits(
  //           props.benefit.childBenefits,
  //           "veteran"
  //         )
  //     ).toEqual(props.benefit.childBenefits);
  //
  //     expect(
  //       mount(<BenefitExpansion {...props} {...reduxData} />)
  //         .instance()
  //         .getAlsoEligibleBenefits(
  //           props.benefit.childBenefits,
  //           "family"
  //         )
  //     ).toEqual([]);
  //
  //   });
  // });

  // it("has a correct getMatchingBenefits function", () => {
  //   expect(
  //     mount(<BenefitExpansion {...props} {...reduxData} />)
  //       .instance()
  //       .getMatchingBenefits(
  //         reduxData.benefits,
  //         new Set(["benefit_1", "benefit_99"])
  //       )
  //   ).toEqual([reduxData.benefits[1]]);
  // });
});

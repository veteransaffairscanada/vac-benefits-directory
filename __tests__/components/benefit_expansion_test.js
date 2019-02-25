import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { BenefitExpansion } from "../../components/benefit_expansion";
import fs from "fs";
const data = JSON.parse(fs.readFileSync("data/data.json"));

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("BenefitExpansion", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      t: () => "en",
      benefit: data.benefits.filter(
        x => x.vacNameEn === "Disability benefits"
      )[0]
    };
    mockStore = configureStore();
    reduxData = {
      benefits: data.benefits,
      benefitEligibility: data.benefitEligibility,
      multipleChoiceOptions: data.multipleChoiceOptions,
      benefitExamples: data.benefitExamples,
      needs: data.needs,
      selectedNeeds: {},
      questions: data.questions,
      patronType: "veteran",
      serviceType: "CAF",
      statusAndVitals: "",
      serviceHealthIssue: "",
      searchString: ""
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

  describe("getAlsoEligibleBenefits", () => {
    it("returns the correct veteran benefits", () => {
      const childBenefits = props.benefit.childBenefits
        ? reduxData.benefits.filter(
            ab => props.benefit.childBenefits.indexOf(ab.id) > -1
          )
        : [];
      expect(
        mount(<BenefitExpansion {...props} {...reduxData} />)
          .instance()
          .getAlsoEligibleBenefits(childBenefits, "veteran")
          .map(x => x.vacNameEn)
      ).toEqual([
        "Attendance Allowance",
        "Career Impact Allowance",
        "Caregiver Recognition Benefit",
        "Clothing Allowance",
        "Exceptional Incapacity Allowance",
        "Treatment benefits",
        "Veterans Independence Program"
      ]);
    });

    it("returns the correct family benefits", () => {
      const childBenefits = props.benefit.childBenefits
        ? reduxData.benefits.filter(
            ab => props.benefit.childBenefits.indexOf(ab.id) > -1
          )
        : [];
      expect(
        mount(<BenefitExpansion {...props} {...reduxData} />)
          .instance()
          .getAlsoEligibleBenefits(childBenefits, "family")
          .map(x => x.vacNameEn)
      ).toEqual(["Caregiver Recognition Benefit"]);
    });
  });
});

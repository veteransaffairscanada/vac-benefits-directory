import React from "react";
import { mount } from "enzyme";
import { BenefitCardHeader } from "../../components/benefit_card_header";
import benefitsFixture from "../fixtures/benefits";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("BenefitCardHeader", () => {
  let props;
  beforeEach(() => {
    props = {
      t: () => "en",
      benefit: benefitsFixture[1],
      benefits: benefitsFixture,
      language: "en"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<BenefitCardHeader {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("renders CardHeaderParentInfo if there are parent benefits", () => {
    props.benefit = benefitsFixture[1];
    expect(
      mount(<BenefitCardHeader {...props} />).find("CardHeaderParentInfo")
        .length
    ).toEqual(1);
  });

  it("does not render CardHeaderParentInfo if there are parent benefits", () => {
    props.benefit = benefitsFixture[0];
    expect(
      mount(<BenefitCardHeader {...props} />).find("CardHeaderParentInfo")
        .length
    ).toEqual(0);
  });

  it("renders CardHeaderImportantInfo if there is a note", () => {
    props.benefit.noteEn = "noteEn";
    props.benefit.noteFr = "noteFr";
    expect(
      mount(<BenefitCardHeader {...props} />).find("CardHeaderImportantInfo")
        .length
    ).toEqual(1);
  });

  it("does not render CardHeaderImportantInfo if there is no note", () => {
    props.benefit.noteEn = undefined;
    props.benefit.noteFr = undefined;

    expect(
      mount(<BenefitCardHeader {...props} />).find("CardHeaderImportantInfo")
        .length
    ).toEqual(0);
  });
});

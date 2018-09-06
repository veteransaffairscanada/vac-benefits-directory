import React from "react";
import { mount } from "enzyme";
import { BenefitCardHeaderMoreInfo } from "../../components/benefit_card_additional_info";
import benefitsFixture from "../fixtures/benefits";

describe("BenefitCardHeader", () => {
  let props;

  beforeEach(() => {
    props = {
      t: () => "en",
      benefit: benefitsFixture[1],
      benefits: benefitsFixture
    };
  });

  it("contains a Paper wrapper with an icon", () => {
    props.benefit = benefitsFixture[1];
    expect(
      mount(<BenefitCardHeaderMoreInfo {...props} />).find("Paper").length
    ).toEqual(1);
    expect(
      mount(<BenefitCardHeaderMoreInfo {...props} />).find("svg").length
    ).toEqual(1);
  });

  it("no header is present if there are no notes defined", () => {
    props.benefit = benefitsFixture[0];
    expect(
      mount(<BenefitCardHeaderMoreInfo {...props} />).find("span").length
    ).toEqual(0);
  });

  it("note is present if defined", () => {
    expect(
      mount(<BenefitCardHeaderMoreInfo {...props} />)
        .find("span")
        .html()
    ).not.toEqual(null);
  });
});

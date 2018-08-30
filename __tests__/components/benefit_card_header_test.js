import React from "react";
import { mount, shallow } from "enzyme";
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
      benefits: benefitsFixture
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<BenefitCardHeader {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains the name", () => {
    expect(mount(<BenefitCardHeader {...props} />).text()).toContain(
      benefitsFixture[1].vacNameEn
    );
  });

  it("has a correctly configured external link <a>", () => {
    expect(
      mount(<BenefitCardHeader {...props} />)
        .find("a")
        .prop("target")
    ).toEqual("_blank");
    expect(
      mount(<BenefitCardHeader {...props} />)
        .find("a")
        .prop("href")
    ).toEqual(benefitsFixture[0].benefitPageEn);
    expect(
      mount(<BenefitCardHeader {...props} />)
        .find("a")
        .text()
    ).toEqual(benefitsFixture[0].vacNameEn);
  });

  it("no header is present if there are no parent benefits", () => {
    props.benefit = benefitsFixture[0];
    expect(mount(<BenefitCardHeader {...props} />).html()).toEqual(null);
  });

  it("header is present if benefit has parents and requires gateway", () => {
    expect(mount(<BenefitCardHeader {...props} />).html()).not.toEqual(null);
  });

  describe("when language is French", () => {
    beforeEach(() => {
      props.t = () => "fr";
    });

    it("contains the French name", () => {
      expect(mount(<BenefitCardHeader {...props} />).text()).toContain(
        benefitsFixture[0].vacNameFr
      );
    });

    it("has an <a> with the French link", () => {
      expect(
        mount(<BenefitCardHeader {...props} />)
          .find("a")
          .prop("href")
      ).toEqual(benefitsFixture[0].benefitPageFr);
      expect(
        mount(<BenefitCardHeader {...props} />)
          .find("a")
          .text()
      ).toEqual(benefitsFixture[0].vacNameFr);
    });
  });

  it("clicking link logs an exit event", () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    mount(<BenefitCardHeader {...props} />)
      .find("a")
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Exit",
      benefitsFixture[0].benefitPageEn
    );
  });
});

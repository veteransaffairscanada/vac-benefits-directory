/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";

import { DataValidation } from "../../pages/data-validation";
import benefitsFixture from "../fixtures/benefits";
import translationsFixture from "../fixtures/translations";
import benefitEligibilityFixture from "../fixtures/benefitEligibility";
import needsFixture from "../fixtures/needs";
import translate from "../fixtures/translate";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("DataValidation", () => {
  let props;
  let _mountedDataValidation;

  const mountedDataValidation = () => {
    if (!_mountedDataValidation) {
      _mountedDataValidation = shallow(<DataValidation {...props} />);
    }
    return _mountedDataValidation;
  };

  beforeEach(() => {
    props = {
      translations: translationsFixture,
      t: translate,
      i18n: {
        addResourceBundle: jest.fn()
      },
      benefits: benefitsFixture,
      benefitEligibility: benefitEligibilityFixture,
      needs: needsFixture,
      errors: [],
      url: { query: {} }
    };
    _mountedDataValidation = undefined;
  });

  it("has a correct createData function", () => {
    const dataValidationInstance = mountedDataValidation().instance();
    const returnValuel1 = dataValidationInstance.createData("n1", 10, "s1");
    expect(returnValuel1).toEqual({
      name: "n1",
      value: 10,
      status: "s1"
    });
  });

  it("passes axe tests", async () => {
    let html = mountedDataValidation().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows the refresh cache button", () => {
    expect(
      mountedDataValidation()
        .find("#refreshCache")
        .first().length
    ).toEqual(1);
  });

  it("passes all tests using the default fixtures", () => {
    expect(mountedDataValidation().html()).toContain("Pass");
    expect(mountedDataValidation().html()).not.toContain("Fail");
  });

  it("fails if there are no benefits", () => {
    props.benefits = [];
    expect(mountedDataValidation().html()).toContain("Fail");
  });
  it("fails if there is no benefitEligibility", () => {
    props.benefitEligibility = [];
    expect(mountedDataValidation().html()).toContain("Fail");
  });

  it("fails if there are no needs", () => {
    props.needs = [];
    expect(mountedDataValidation().html()).toContain("Fail");
  });

  it("fails if a benefit is missing english or french text", () => {
    props.benefits[0].vacNameEn = "";
    expect(mountedDataValidation().html()).toContain("Fail");
  });

  it("fails if a benefit is missing EN or FR links", () => {
    props.benefits[0].benefitPageFr = "";
    expect(mountedDataValidation().html()).toContain("Fail");
  });

  it("fails if a benefit does not have any linked Needs", () => {
    props.benefits[0].needs = "";
    expect(mountedDataValidation().html()).toContain("Fail");
  });

  it("fails if a benefit is not listed in Benefit Eligibility", () => {
    props.benefitEligibility[0].benefit = "";
    expect(mountedDataValidation().html()).toContain("Fail");
  });

  it("fails if checkBenefitsFields doesn't find empty fields", () => {
    props.benefits[0].vacNameEn = "";
    const instance = shallow(<DataValidation {...props} />).instance();
    expect(instance.checkMissingNeeds(props.benefits[0], 0)).toContain(
      props.benefits[0].vacNameEn
    );
  });

  it("fails if checkTranslationsFields doesn't find empty fields", () => {
    props.translations[0].vacNameEn = "";
    const instance = shallow(<DataValidation {...props} />).instance();
    expect(instance.checkMissingNeeds(props.translations[0], 0)).toContain(
      props.translations[0].vacNameEn
    );
  });

  it("fails if checkMissingNeeds doesn't find missing needs", () => {
    props.benefits[0].needs = "";
    const instance = shallow(<DataValidation {...props} />).instance();
    expect(instance.checkMissingNeeds(props.benefits[0], 0)).toContain(
      props.benefits[0].vacNameEn
    );
  });

  describe("checkBenefitUrls", () => {
    it("it resets the invalidUrls state", () => {
      mountedDataValidation().setState({
        invalidUrls: ["foo"]
      });
      mountedDataValidation()
        .instance()
        .checkBenefitUrls();
      expect(mountedDataValidation().state("invalidUrls")).toEqual([]);
    });

    it("it sets urlState state to true from undefined", done => {
      expect(mountedDataValidation().state("urlState")).toEqual(undefined);
      Promise.resolve(
        mountedDataValidation()
          .instance()
          .checkBenefitUrls()
      ).then(() => {
        expect(mountedDataValidation().state("urlState")).toEqual(true);
        done();
      });
    });

    it("loops through benefits and sends the benefit ID to the /checkURL endpoint", done => {
      global.fetch = jest.fn();
      global.fetch.mockReturnValue(new Promise(() => {}));
      Promise.resolve(
        mountedDataValidation()
          .instance()
          .checkBenefitUrls()
      ).then(() => {
        expect(fetch.mock.calls.length).toEqual(4);
        done();
      });
    });

    it("displays a server error if one exists ", () => {
      expect(
        shallow(<DataValidation {...props} />)
          .find("#errors")
          .html()
      ).toContain("Pass");
      props.errors.push("veryBadError");
      expect(
        shallow(<DataValidation {...props} />)
          .find("#errors")
          .html()
      ).toContain("Fail");
    });
  });
});

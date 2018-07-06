/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";

import { DataValidation } from "../../pages/data-validation";
import benefitsFixture from "../fixtures/benefits";
import translationsFixture from "../fixtures/translations";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import examplesFixture from "../fixtures/examples";
import areaOfficesFixture from "../fixtures/area_offices";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

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
      t: key => key,
      i18n: {
        addResourceBundle: jest.fn()
      },
      //  data-validation: {
      //    getBrokenBenefits: jest.fn()
      //  },
      benefits: benefitsFixture,
      eligibilityPaths: eligibilityPathsFixture,
      needs: needsFixture,
      examples: examplesFixture,
      areaOffices: areaOfficesFixture,
      classes: {}
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

  it("passes all tests using the default fixtures", () => {
    expect(mountedDataValidation().html()).toContain("Pass");
    expect(mountedDataValidation().html()).not.toContain("Fail");
  });

  it("fails if there are no benefits", () => {
    props.benefits = [];
    expect(mountedDataValidation().html()).toContain("Fail");
  });

  it("fails if there are no eligibility paths", () => {
    props.eligibilityPaths = [];
    expect(mountedDataValidation().html()).toContain("Fail");
  });

  it("fails if there are no needs", () => {
    props.needs = [];
    expect(mountedDataValidation().html()).toContain("Fail");
  });

  it("fails if there are no examples", () => {
    props.examples = [];
    expect(mountedDataValidation().html()).toContain("Fail");
  });

  it("fails if areaOffices is empty", () => {
    props.areaOffices = [];
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

  it("fails if a benefit is not connected to any Eligibility Paths", () => {
    props.benefits[0].eligibilityPaths = "";
    expect(mountedDataValidation().html()).toContain("Fail");
  });

  it("fails if checkBenefitsFields doesn't find empty fields", () => {
    props.benefits[0].vacNameEn = "";
    const instance = shallow(<DataValidation {...props} />).instance();
    expect(instance.checkMissingNeeds(props.benefits[0], 0)).toEqual(
      " " + props.benefits[0].id + " (" + 1 + "),"
    );
  });

  it("fails if checkTranslationsFields doesn't find empty fields", () => {
    props.translations[0].vacNameEn = "";
    const instance = shallow(<DataValidation {...props} />).instance();
    expect(instance.checkMissingNeeds(props.translations[0], 0)).toEqual(
      " " + props.translations[0].id + " (" + 1 + "),"
    );
  });

  it("fails if checkMissingNeeds doesn't find missing needs", () => {
    props.benefits[0].needs = "";
    const instance = shallow(<DataValidation {...props} />).instance();
    expect(instance.checkMissingNeeds(props.benefits[0], 0)).toEqual(
      " " + props.benefits[0].id + " (" + 1 + "),"
    );
  });

  it("fails if checkEligibiltyPaths doesn't find missing needs", () => {
    props.benefits[0].eligibilityPaths = "";
    const instance = shallow(<DataValidation {...props} />).instance();
    expect(instance.checkMissingNeeds(props.benefits[0], 0)).toEqual(
      " " + props.benefits[0].id + " (" + 1 + "),"
    );
  });

  it("fail if checkAreaOfficesFields doesn't find empty fields", () => {
    props.areaOffices[0].name_en = "";
    const instance = shallow(<DataValidation {...props} />).instance();
    expect(instance.checkAreaOfficesFields(props.areaOffices[0], 0)).toEqual(
      " " + props.areaOffices[0].id + " (" + 1 + "),"
    );
  });
});

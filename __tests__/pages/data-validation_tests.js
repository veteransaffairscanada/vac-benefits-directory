/* eslint-env jest */

import { shallow } from "enzyme";

import { DataValidation } from "../../pages/data-validation";
import benefitsFixture from "../fixtures/benefits";
import translationsFixture from "../fixtures/translations";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import areaOfficesFixture from "../fixtures/area_offices";
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
      eligibilityPaths: eligibilityPathsFixture,
      needs: needsFixture,
      errors: [],
      areaOffices: areaOfficesFixture
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

  it("fails if checkEligibiltyPaths doesn't find missing needs", () => {
    props.benefits[0].eligibilityPaths = "";
    const instance = shallow(<DataValidation {...props} />).instance();
    expect(instance.checkMissingNeeds(props.benefits[0], 0)).toContain(
      props.benefits[0].vacNameEn
    );
  });

  it("fail if checkAreaOfficesFields doesn't find empty fields", () => {
    props.areaOffices[0].name_en = "";
    const instance = shallow(<DataValidation {...props} />).instance();
    expect(instance.checkAreaOfficesFields(props.areaOffices[0], 0)).toContain(
      props.areaOffices[0].id
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

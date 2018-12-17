/* eslint-env jest */

import { shallow } from "enzyme";

import { Print } from "../../pages/print";
import benefitsFixture from "../fixtures/benefits";
import elegibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import areaOfficesFixture from "../fixtures/area_offices";
import questionFixture from "../fixtures/questions";
import multipleChoiceOptions from "../fixtures/multiple_choice_options";
import configureStore from "redux-mock-store";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");
global.window = {};
global.window.print = jest.fn();

describe("Print", () => {
  let props, reduxState, mockStore;
  let _mountedPrint;
  const mountedPrint = () => {
    if (!_mountedPrint) {
      _mountedPrint = shallow(<Print {...props} {...reduxState} />);
    }
    return _mountedPrint;
  };

  beforeEach(() => {
    props = {
      url: {
        query: {}
      },
      translations: [],
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: key => {
        return key == "current-language-code" ? "en" : key;
      }
    };
    mockStore = configureStore();

    reduxState = {
      profileQuestions: questionFixture.filter(q => q.variable_name != "needs"),
      benefits: benefitsFixture,
      eligibilityPaths: elegibilityPathsFixture,
      selectedNeeds: {},
      needs: needsFixture,
      selectedEligibility: {
        serviceType: "",
        patronType: "",
        statusAndVitals: "",
        serviceHealthIssue: ""
      },
      areaOffices: areaOfficesFixture,
      multipleChoiceOptions: multipleChoiceOptions
    };
    props.store = mockStore(reduxState);
    _mountedPrint = undefined;
  });

  it("passes axe tests", async () => {
    let html = mountedPrint().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("parses url correctly", () => {
    props.url.query["patronType"] = "p2";
    props.url.query["serviceType"] = "s1";
    props.url.query["selectedNeeds"] = "need_0,need_1";

    expect(
      mountedPrint()
        .find(".profile_section")
        .text()
    ).toContain("p2_en");

    expect(
      mountedPrint()
        .find(".profile_section")
        .text()
    ).toContain("br_s1_en");

    expect(mountedPrint().html()).toContain("need_0");
  });

  it("has a correct sortBenefits function", () => {
    let BLInstance = mountedPrint().instance();
    expect(
      BLInstance.sortBenefits(benefitsFixture, "en", "popularity").map(
        b => b.id
      )
    ).toEqual(["benefit_2", "benefit_1", "benefit_0", "benefit_3"]);
  });

  it("renders benefits correctly", () => {
    props.url.query["benefits"] = "benefit_0,benefit_3";
    expect(mountedPrint().find(".benefitsListItem").length).toEqual(2);
  });

  it("includes the address for the closest area office", () => {
    props.url.query["closestAOID"] = "0";
    expect(
      mountedPrint()
        .find("#closest_office_info")
        .html()
    ).toContain("address_en");
  });
});

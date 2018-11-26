/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import configureStore from "redux-mock-store";

import { BB } from "../../components/BB";
import benefitsFixture from "../fixtures/benefits";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import areaOfficesFixture from "../fixtures/area_offices";
import questionsFixture from "../fixtures/questions";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import questionClearLogicFixture from "../fixtures/question_clear_logic";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("BB", () => {
  let props;
  let _mountedBB;
  let _shallowBB;
  let mockStore, reduxData;

  const mounted_BB = () => {
    if (!_mountedBB) {
      _mountedBB = mount(<BB {...props} {...reduxData} />);
    }
    return _mountedBB;
  };

  const shallow_BB = () => {
    if (!_shallowBB) {
      _shallowBB = shallow(<BB {...props} {...reduxData} />);
    }
    return _shallowBB;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      clearFilters: () => true,
      clearNeeds: () => true,
      id: "BB",
      filteredBenefits: [],
      setSelectedNeeds: () => true,
      favouriteBenefits: [],
      url: { query: {} }
    };
    _shallowBB = undefined;
    _mountedBB = undefined;
    reduxData = {
      cookiesDisabled: false,
      setCookiesDisabled: jest.fn(),
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionClearLogicFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      benefits: benefitsFixture,
      favouriteBenefits: [],
      eligibilityPaths: eligibilityPathsFixture,
      filteredBenefits: benefitsFixture,
      needs: needsFixture,
      serviceType: "",
      patronType: "",
      searchString: "",
      statusAndVitals: "",
      selectedEligibility: {
        serviceType: "",
        patronType: "",
        statusAndVitals: ""
      },
      serviceHealthIssue: "",
      setSearchString: jest.fn(),
      selectedNeeds: {},
      option: "",
      pageWidth: 1000,
      areaOffices: areaOfficesFixture,
      selectedAreaOffice: areaOfficesFixture[0],
      closestAreaOffice: areaOfficesFixture[0]
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mounted_BB().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains a BenefitsPane", async () => {
    expect(mounted_BB().find("#BenefitsPane").length).not.toEqual(0);
  });

  it("has the ProfileSelector component", () => {
    expect(mounted_BB().find("ProfileSelector").length).not.toEqual(0);
  });

  it("has the NeedsSelector component", () => {
    expect(mounted_BB().find("NeedsSelector").length).not.toEqual(0);
  });

  it("has a Clear Filters button", () => {
    expect(shallow_BB().find("#ClearEligibilityFilters"));
  });

  it("contains the print button", () => {
    expect(mounted_BB().find("#printButton").length).toEqual(1);
  });

  it("contains the share button", () => {
    expect(mounted_BB().find("#shareButton").length).toEqual(1);
  });

  it("clicking share button changes showModal state to true", () => {
    let mounted = mounted_BB();
    mounted
      .find("#shareButton")
      .first()
      .simulate("click");
    expect(mounted.state().showModal).toEqual(true);
  });
});

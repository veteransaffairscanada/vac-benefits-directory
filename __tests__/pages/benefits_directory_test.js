/* eslint-env jest */

import { mount, shallow } from "enzyme";
import Router from "next/router";

import React from "react";
import { BenefitsDirectory } from "../../pages/benefits-directory";
import benefitsFixture from "../fixtures/benefits";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import areaOfficesFixture from "../fixtures/area_offices";
import translate from "../fixtures/translate";
import lunr from "lunr";
import questionsFixture from "../fixtures/questions";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import questionClearLogicFixture from "../fixtures/question_clear_logic";
import nextStepsFixture from "../fixtures/nextSteps";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("BenefitsDirectory", () => {
  Router.replace = jest.fn();

  let props;
  let _mountedBenefitsDirectory;
  let mockStore, reduxData;

  const mountedBenefitsDirectory = () => {
    if (!_mountedBenefitsDirectory) {
      _mountedBenefitsDirectory = shallow(
        <BenefitsDirectory {...props} {...reduxData} />
      );
    }
    return _mountedBenefitsDirectory;
  };

  beforeEach(() => {
    props = {
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: translate,
      url: { query: {} },
      setPageWidth: jest.fn(),
      profileFilters: {}
    };
    _mountedBenefitsDirectory = undefined;
    mockStore = configureStore();
    reduxData = {
      nextSteps: nextStepsFixture,
      cookiesDisabled: false,
      setCookiesDisabled: jest.fn(),
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionClearLogicFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      option: "",
      translations: [],
      benefits: benefitsFixture,
      eligibilityPaths: eligibilityPathsFixture,
      enIdx: JSON.stringify({
        version: lunr.version,
        fields: ["vacNameEn", "oneLineDescriptionEn"],
        fieldVectors: [
          ["vacNameEn/1", [0, 0.288]],
          ["oneLineDescriptionEn/1", [1, 0.288]]
        ],
        invertedIndex: [
          [
            "biz",
            { _index: 1, vacNameEn: {}, oneLineDescriptionEn: { "1": {} } }
          ],
          [
            "fiz",
            { _index: 0, vacNameEn: { "1": {} }, oneLineDescriptionEn: {} }
          ]
        ],
        pipeline: ["stemmer"]
      }),
      frIdx: JSON.stringify({
        version: lunr.version,
        fields: ["vacNameFr", "oneLineDescriptionFr"],
        fieldVectors: [
          ["vacNameFr/1", [0, 0.288]],
          ["oneLineDescriptionFr/1", [1, 0.288]]
        ],
        invertedIndex: [
          [
            "biz",
            { _index: 1, vacNameFr: {}, oneLineDescriptionFr: { "1": {} } }
          ],
          [
            "fiz",
            { _index: 0, vacNameFr: { "1": {} }, oneLineDescriptionFr: {} }
          ]
        ],
        pipeline: ["stemmer"]
      }),
      needs: needsFixture,
      searchString: "",
      selectedNeeds: {},
      serviceType: "s1",
      patronType: "p2",
      statusAndVitals: "",
      serviceHealthIssue: "",
      favouriteBenefits: [benefitsFixture[0].id],
      filteredBenefits: benefitsFixture,
      pageWidth: 1000,
      areaOffices: areaOfficesFixture,
      selectedAreaOffice: areaOfficesFixture[0],
      closestAreaOffice: areaOfficesFixture[0]
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mountedBenefitsDirectory().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("calls window.removeEventListener when it unmounts", () => {
    window.removeEventListener = jest.fn();
    const mounted = mount(<BenefitsDirectory {...props} {...reduxData} />);
    mounted.setProps({ foo: "bar" });
    mounted.unmount();
    expect(window.removeEventListener).toBeCalled();
  });

  it("has a correct setURL function", () => {
    props.profileFilters = { patronType: "veteran", service: undefined };
    reduxData.selectedNeeds = { health: "health", financial: "financial" };
    reduxData.searchString = "foo";
    let AInstance = mountedBenefitsDirectory().instance();
    const expectedURL =
      "/benefits-directory?lng=en&selectedNeeds=health,financial&patronType=veteran&searchString=foo";
    AInstance.setURL();
    expect(Router.replace).toBeCalledWith(expectedURL);
  });
});

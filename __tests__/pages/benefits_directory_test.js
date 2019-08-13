/* eslint-env jest */

import { mount, shallow } from "enzyme";
import Router from "next/router";

import React from "react";
import { BenefitsDirectory } from "../../pages/benefits-directory";
import benefitsFixture from "../fixtures/benefits";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";
import benefitEligibilityFixture from "../fixtures/benefitEligibility";
import translate from "../fixtures/translate";
import lunr from "lunr";
import questionsFixture from "../fixtures/questions";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import questionClearLogicFixture from "../fixtures/question_clear_logic";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");
window.matchMedia = () => ({
  addListener: () => {},
  removeListener: () => {}
});
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
      profileFilters: {}
    };
    _mountedBenefitsDirectory = undefined;
    mockStore = configureStore();
    reduxData = {
      cookiesDisabled: false,
      setCookiesDisabled: jest.fn(),
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionClearLogicFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      option: "",
      translations: [],
      benefits: benefitsFixture,
      benefitEligibility: benefitEligibilityFixture,
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
      favouriteBenefits: [benefitsFixture[1].id],
      filteredBenefits: benefitsFixture
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
});

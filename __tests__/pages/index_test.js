/* eslint-env jest */

import { shallow } from "enzyme";
import Router from "next/router";
import React from "react";
import { Guided } from "../../pages/index";
import benefitsFixture from "../fixtures/benefits";
import translate from "../fixtures/translate";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import questionsFixture from "../fixtures/questions";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import multipleChoiceOptions from "../fixtures/multiple_choice_options";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Index", () => {
  let props;
  let _mountedGuided;
  let mockStore, reduxState;

  const mountedGuided = () => {
    if (!_mountedGuided) {
      _mountedGuided = shallow(<Guided {...props} {...reduxState} />);
    }
    return _mountedGuided;
  };

  beforeEach(() => {
    props = {
      translations: [],
      url: {
        query: {}
      },
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: translate,
      storeHydrated: true,
      benefits: benefitsFixture,
      saveQuestionResponse: jest.fn(),
      sectionOrder: ["patronType", "serviceType", "needs"]
    };
    _mountedGuided = undefined;
    mockStore = configureStore();
    reduxState = {
      benefits: benefitsFixture,
      eligibilityPaths: eligibilityPathsFixture,
      needs: needsFixture,
      selectedNeeds: {},
      serviceType: "s1",
      patronType: "p1",
      option: "",
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionDisplayLogicFixture,
      multipleChoiceOptions: multipleChoiceOptions
    };
    props.store = mockStore(reduxState);
    props.reduxState = reduxState;
  });

  it("passes axe tests", async () => {
    let html = mountedGuided().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a correct setURL function", () => {
    Router.replace = jest.fn();
    reduxState.selectedNeeds = { need_1: "need_1", need_2: "need_2" };
    let guidedInstance = mountedGuided().instance();
    const state = {
      section: "statusAndVitals"
    };
    const expectedURL =
      "/index?section=statusAndVitals&selectedNeeds=need_1,need_2&patronType=p1&serviceType=s1&lng=en";
    guidedInstance.setState(state);
    guidedInstance.setURL(state);
    expect(Router.replace).toBeCalledWith(expectedURL);
  });

  it("componentWillMount sets state correctly from empty url", () => {
    expect(mountedGuided().state().section).toEqual("patronType");
  });

  it("getPrevSection returns the correct previous section", () => {
    const displayable_sections = [
      "patronType",
      "serviceType",
      "statusAndVitals"
    ];
    let guidedInstance = mountedGuided().instance();

    expect(guidedInstance.getPrevSection(displayable_sections, 1)).toEqual(
      "patronType"
    );
    expect(guidedInstance.getPrevSection(displayable_sections, 0)).toEqual(
      "index"
    );
  });

  it("getSubtitle returns the correct subtitle", () => {
    let guidedInstance = mountedGuided().instance();
    expect(guidedInstance.getSubtitle(questionsFixture[1])).toEqual(
      "Select the service type."
    );
  });

  it("getTooltip returns the correct tooltip", () => {
    let guidedInstance = mountedGuided().instance();
    expect(guidedInstance.getTooltip(questionsFixture[1])).toEqual(
      "tooltip english"
    );
  });
});

/* eslint-env jest */

import { shallow } from "enzyme";
import Router from "next/router";
import React from "react";
import { Guided } from "../../pages/guided";
import benefitsFixture from "../fixtures/benefits";
import translate from "../fixtures/translate";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";
import examplesFixture from "../fixtures/examples";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import questionsFixture from "../fixtures/questions";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Guided", () => {
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
      dispatch: jest.fn(),
      benefits: benefitsFixture,
      saveQuestionResponse: jest.fn(),
      sectionOrder: [
        "patronType",
        "serviceType",
        "statusAndVitals",
        "serviceHealthIssue",
        "needs"
      ]
    };
    _mountedGuided = undefined;
    mockStore = configureStore();
    reduxState = {
      benefits: benefitsFixture,
      examples: examplesFixture,
      eligibilityPaths: eligibilityPathsFixture,
      needs: needsFixture,
      selectedNeeds: {},
      serviceType: "CAF",
      patronType: "family",
      statusAndVitals: "",
      serviceHealthIssue: "",
      option: "",
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionDisplayLogicFixture
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
    reduxState.selectedNeeds = { health: "health", financial: "financial" };
    let guidedInstance = mountedGuided().instance();
    const state = {
      section: "statusAndVitals"
    };
    const expectedURL =
      "/guided?section=statusAndVitals&selectedNeeds=health,financial&patronType=family&serviceType=CAF&lng=en";
    guidedInstance.setState(state);
    guidedInstance.setURL(state);
    expect(Router.replace).toBeCalledWith(expectedURL);
  });

  it("componentWillMount sets state correctly from empty url", () => {
    expect(mountedGuided().state().section).toEqual("patronType");
  });

  describe("setSection", () => {
    it("returns correct section when passed as argument", () => {
      props.sectionOrder.forEach(section => {
        let guidedInstance = mountedGuided().instance();
        guidedInstance.setSection(section);
        expect(guidedInstance.state.section).toEqual(section);
      });
    });

    it("clears redux data for future questions", () => {
      let guidedInstance = mountedGuided().instance();
      guidedInstance.setSection("patronType");
      expect(props.saveQuestionResponse).toBeCalledWith("serviceType", "");
      expect(props.saveQuestionResponse).toBeCalledWith("statusAndVitals", "");
      expect(props.saveQuestionResponse).toBeCalledWith("selectedNeeds", {});
    });
  });

  it("getNextSection returns the correct next section", () => {
    const displayable_sections = [
      "patronType",
      "serviceType",
      "statusAndVitals",
      "needs"
    ];
    let guidedInstance = mountedGuided().instance();

    expect(guidedInstance.getNextSection(displayable_sections, 1)).toEqual(
      "statusAndVitals"
    );

    expect(guidedInstance.getNextSection(displayable_sections, 3)).toEqual(
      "benefits-directory"
    );
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
});

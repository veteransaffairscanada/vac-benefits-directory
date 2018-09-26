import React from "react";
import { mount } from "enzyme";
import { ProfileSelector } from "../../components/profile_selector";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import questionsFixture from "../fixtures/questions";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
import configureStore from "redux-mock-store";

describe("ProfileSelector", () => {
  let props;
  let mockStore, reduxState;

  beforeEach(() => {
    props = {
      t: key => key,
      theme: {}
    };
    reduxState = {
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      eligibilityPaths: eligibilityPathsFixture,
      serviceType: "",
      patronType: "",
      serviceHealthIssue: "",
      statusAndVitals: "",
      setPatronType: jest.fn(),
      setServiceType: jest.fn(),
      setStatusAndVitals: jest.fn(),
      setServiceHealthIssue: jest.fn()
    };
    mockStore = configureStore();
    props.store = mockStore(reduxState);
    props.reduxState = reduxState;
  });

  it("passes axe tests", async () => {
    let html = mount(<ProfileSelector {...props} {...reduxState} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a patronType filter", () => {
    expect(
      mount(<ProfileSelector {...props} {...reduxState} />)
        .find(".patronTypeFilter")
        .first().length
    ).toEqual(1);
  });

  it("has the correct radio button text", () => {
    const text = mount(<ProfileSelector {...props} {...reduxState} />)
      .find(".patronTypeFilter")
      .first()
      .find("FormControlLabel")
      .first()
      .text();
    expect(text).toEqual("service-person");
  });

  describe("showQuestion function", () => {
    it("shows the first question", () => {
      const instance = mount(
        <ProfileSelector {...props} {...reduxState} />
      ).instance();
      expect(instance.showQuestion(questionsFixture[0], 0, reduxState)).toEqual(
        true
      );
    });

    it("hides question if previous question doesn't have an answer", () => {
      const instance = mount(
        <ProfileSelector {...props} {...reduxState} />
      ).instance();
      expect(instance.showQuestion(questionsFixture[1], 1, reduxState)).toEqual(
        false
      );
    });

    it("shows question if previous question has an answer", () => {
      reduxState.patronType = "service-member";
      const instance = mount(
        <ProfileSelector {...props} {...reduxState} />
      ).instance();
      expect(instance.showQuestion(questionsFixture[1], 1, reduxState)).toEqual(
        true
      );
    });

    it("hides questions if organization selected", () => {
      reduxState.patronType = "organization";
      const instance = mount(
        <ProfileSelector {...props} {...reduxState} />
      ).instance();
      expect(instance.showQuestion(questionsFixture[1], 1, reduxState)).toEqual(
        false
      );
    });
  });
});

import React from "react";
import { mount, shallow } from "enzyme";
import { RadioSelector } from "../../components/radio_selector";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import questionsFixture from "../fixtures/questions";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import questionClearLogicFixture from "../fixtures/question_clear_logic";
import responsesFixture from "../fixtures/responses";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("RadioSelector", () => {
  let props;

  beforeEach(() => {
    props = {
      legend: "",
      saveQuestionResponse: jest.fn(),
      options: ["releasedAlive", "stillServing", "deceased"],
      selectorType: "statusAndVitals",
      responses: responsesFixture,
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionClearLogicFixture,
      t: key => key,
      eligibilityPaths: eligibilityPathsFixture
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<RadioSelector {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has 3 FormControlLabels", () => {
    expect(
      mount(<RadioSelector {...props} />).find("FormControlLabel").length
    ).toEqual(3);
  });

  it("2nd FormControlLabel has the correct text", () => {
    expect(
      mount(<RadioSelector {...props} />)
        .find("FormControlLabel")
        .at(1)
        .text()
    ).toEqual("stillServing");
  });

  describe("isDisabled function", () => {
    it("returns false if we don't hit a condition", () => {
      const isDisabled = shallow(<RadioSelector {...props} />).instance()
        .isDisabled;
      expect(
        isDisabled("option", props.responses, props.questionDisplayLogic)
      ).toEqual(false);
    });

    it("returns true if we do hit a condition", () => {
      props.responses.patronType = "service-person";
      const isDisabled = shallow(<RadioSelector {...props} />).instance()
        .isDisabled;
      expect(
        isDisabled("deceased", props.responses, props.questionDisplayLogic)
      ).toEqual(true);
    });
  });

  describe("handleSelect function", () => {
    it("logs an analytics event", () => {
      let instance = shallow(<RadioSelector {...props} />).instance();
      let analytics = require("../../utils/analytics");
      analytics.logEvent = jest.fn();
      instance.handleSelect({ target: { value: "x" } });
      expect(analytics.logEvent).toBeCalledWith(
        "FilterClick",
        "statusAndVitals",
        "x"
      );
    });

    it("calls saveQuestionResponse", () => {
      let instance = shallow(<RadioSelector {...props} />).instance();
      instance.handleSelect({ target: { value: "x" } });
      expect(props.saveQuestionResponse).toBeCalledWith("statusAndVitals", "x");
    });

    it("calls clearAppropriateResponses", () => {
      let instance = shallow(<RadioSelector {...props} />).instance();
      instance.clearAppropriateResponses = jest.fn();
      instance.handleSelect({ target: { value: "x" } });
      expect(instance.clearAppropriateResponses).toBeCalledWith(
        "statusAndVitals",
        "x"
      );
    });
  });

  describe("clearAppropriateResponses function", () => {
    it("clears if there are no required previous responses", () => {
      let instance = shallow(<RadioSelector {...props} />).instance();
      instance.clearAppropriateResponses("patronType", "organization");
      expect(props.saveQuestionResponse).toBeCalledWith("serviceType", "");
      expect(props.saveQuestionResponse).toBeCalledWith("statusAndVitals", "");
      expect(props.saveQuestionResponse).toBeCalledWith(
        "serviceHealthIssue",
        ""
      );
    });

    it("clears if no there are required previous responses", () => {
      props.responses.statusAndVitals = "deceased";
      let instance = shallow(<RadioSelector {...props} />).instance();
      instance.clearAppropriateResponses("patronType", "service-person");
      expect(props.saveQuestionResponse).toBeCalledWith("statusAndVitals", "");
      expect(props.saveQuestionResponse).toBeCalledWith(
        "serviceHealthIssue",
        ""
      );
    });

    it("doesn't clear when it shouldn't", () => {
      let instance = shallow(<RadioSelector {...props} />).instance();
      instance.clearAppropriateResponses("patronType", "buddy");
      expect(props.saveQuestionResponse).not.toBeCalled();
    });
  });
});

import React from "react";
import { mount, shallow } from "enzyme";
import { RadioSelector } from "../../components/radio_selector";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import questionsFixture from "../fixtures/questions";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import questionClearLogicFixture from "../fixtures/question_clear_logic";
import translateFixture from "../fixtures/translate";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import responsesFixture from "../fixtures/responses";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("RadioSelector", () => {
  let props;

  beforeEach(() => {
    props = {
      legend: "abc",
      saveQuestionResponse: jest.fn(),
      options: ["mco_p1", "mco_p2", "mco_p3"],
      selectorType: "patronType",
      responses: responsesFixture,
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionClearLogicFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      t: translateFixture,
      eligibilityPaths: eligibilityPathsFixture
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<RadioSelector {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has 3 Radio Components", () => {
    expect(mount(<RadioSelector {...props} />).find("Radio").length).toEqual(3);
  });

  it("2nd Radio component has the correct text", () => {
    expect(
      mount(<RadioSelector {...props} />)
        .find("Radio")
        .at(1)
        .text()
    ).toEqual("p2_en");
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
      props.responses.serviceType = "disable_value";
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
        "patronType",
        "x"
      );
    });

    it("calls saveQuestionResponse", () => {
      let instance = shallow(<RadioSelector {...props} />).instance();
      instance.handleSelect({ target: { value: "x" } });
      expect(props.saveQuestionResponse).toBeCalledWith("patronType", "x");
    });

    it("calls clearAppropriateResponses", () => {
      let instance = shallow(<RadioSelector {...props} />).instance();
      instance.clearAppropriateResponses = jest.fn();
      instance.handleSelect({ target: { value: "x" } });
      expect(instance.clearAppropriateResponses).toBeCalledWith(
        "patronType",
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

  it("includes a tooltip component", () => {
    expect(
      shallow(<RadioSelector {...props} />).find("Tooltip").length
    ).toEqual(1);
  });
});

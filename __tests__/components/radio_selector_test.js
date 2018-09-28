import React from "react";
import { mount, shallow } from "enzyme";
import { RadioSelector } from "../../components/radio_selector";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";

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
      responses: {
        patronType: "",
        serviceType: "",
        statusAndVitals: "releasedAlive",
        serviceHealthIssue: ""
      },
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
      expect(isDisabled("a", "a", "")).toEqual(false);
    });

    it("returns true if we do hit a condition", () => {
      const isDisabled = shallow(<RadioSelector {...props} />).instance()
        .isDisabled;

      expect(isDisabled("deceased", "service-person", "")).toEqual(true);
      expect(isDisabled("stillServing", "", "WSV (WWII or Korea)")).toEqual(
        true
      );
    });
  });

  describe("handleSelect function", () => {
    it("calls saveQuestionResponse", () => {
      let instance = shallow(<RadioSelector {...props} />).instance();
      instance.handleSelect({ target: { value: "x" } });
      expect(props.saveQuestionResponse).toBeCalledWith("statusAndVitals", "x");
    });

    it("logs an analytics event", () => {
      let instance = shallow(<RadioSelector {...props} />).instance();
      let analytics = require("../../utils/analytics");
      analytics.logEvent = jest.fn();
      instance.handleSelect("serviceType", "x");
      expect(analytics.logEvent).toBeCalledWith(
        "FilterClick",
        "serviceType",
        "x"
      );
    });
  });

  describe("clearAppropriateResponses function", () => {
    it("clears other filters if Organization is selected", () => {
      let instance = shallow(<RadioSelector {...props} />).instance();
      instance.clearAppropriateResponses("patronType", "organization");
      expect(props.saveQuestionResponse).toBeCalledWith("serviceType", "");
      expect(props.saveQuestionResponse).toBeCalledWith("statusAndVitals", "");
    });

    it("clears statusAndVitals filters if service-person is selected and is deceased", () => {
      props.responses.statusAndVitals = "deceased";
      let instance = shallow(<RadioSelector {...props} />).instance();
      instance.clearAppropriateResponses("patronType", "service-person");
      expect(props.saveQuestionResponse).toBeCalledWith("statusAndVitals", "");
    });

    it("clears statusAndVitals filters if WSV (WWII or Korea) is selected and is stillServing", () => {
      props.responses.statusAndVitals = "stillServing";
      let instance = shallow(<RadioSelector {...props} />).instance();
      instance.clearAppropriateResponses("serviceType", "WSV (WWII or Korea)");
      expect(props.saveQuestionResponse).toBeCalledWith("statusAndVitals", "");
    });

    it("clears statusAndVitals filters if service-person is selected, serviceType is WSV (WWII or Korea), and a statusAndVitals is set", () => {
      props.responses.statusAndVitals = "stillServing";
      props.responses.serviceType = "WSV (WWII or Korea)";
      let instance = shallow(<RadioSelector {...props} />).instance();
      instance.clearAppropriateResponses("patronType", "service-person");
      expect(props.saveQuestionResponse).toBeCalledWith("statusAndVitals", "");
    });

    it("clears statusAndVitals filters if WSV (WWII or Korea) is selected, patronType is service-person, and a statusAndVitals is set", () => {
      props.responses.statusAndVitals = "stillServing";
      props.responses.patronType = "service-person";
      let instance = shallow(<RadioSelector {...props} />).instance();
      instance.clearAppropriateResponses("serviceType", "WSV (WWII or Korea)");
      expect(props.saveQuestionResponse).toBeCalledWith("statusAndVitals", "");
    });

    // it("setUserProfile can set statusAndVitals", () => {
    //   let instance = shallow(<RadioSelector {...props} />).instance();
    //   instance.clearAppropriateResponses("statusAndVitals", "deceased");
    //   expect(props.saveQuestionResponse).toBeCalledWith(
    //     "statusAndVitals",
    //     "deceased"
    //   );
    // });

    // it("returns true as default", () => {
    //   let instance = shallow(<RadioSelector {...props} />).instance();
    //   expect(instance.setUserProfile("foo", "bar")).toEqual(true);
    // });

    it("clears serviceHealthIssue if RCMP is selected and a statusAndVitals is not set (b/c the serviceHealthIssue Q will be hidden)", () => {
      props.responses.statusAndVitals = "";
      let instance = shallow(<RadioSelector {...props} />).instance();
      instance.clearAppropriateResponses("serviceType", "RCMP");
      expect(props.saveQuestionResponse).toBeCalledWith(
        "serviceHealthIssue",
        ""
      );
    });
  });
});

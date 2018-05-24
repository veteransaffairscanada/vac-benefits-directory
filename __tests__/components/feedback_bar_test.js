import React from "react";
import FeedbackBar from "../../components/feedbackBar";
import { mount } from "enzyme";

jest.mock("react-ga");

describe("Feedback bar", () => {
  // Setup

  let props;
  let _mountedFeedbackBar;
  const mountedFeedbackBar = () => {
    if (!_mountedFeedbackBar) {
      _mountedFeedbackBar = mount(<FeedbackBar {...props} />);
    }
    return _mountedFeedbackBar;
  };

  beforeEach(() => {
    props = {
      t: key => key
    };
    _mountedFeedbackBar = undefined;
  });

  // Tests

  it("shows the feedback prompt", () => {
    expect(mountedFeedbackBar().text()).toContain("feedback-prompt");
  });

  describe("clicking the yes button", () => {
    it("shows the feedback response", () => {
      mountedFeedbackBar()
        .find("#feedbackYes")
        .at(0)
        .simulate("click");
      expect(mountedFeedbackBar().text()).toContain("feedback-response");
    });
  });

  describe("clicking the no button", () => {
    it("shows the feedback response", () => {
      mountedFeedbackBar()
        .find("#feedbackNo")
        .at(0)
        .simulate("click");
      expect(mountedFeedbackBar().text()).toContain("feedback-response");
    });
  });

  it("Feedback logged with Google Analytics", () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    mountedFeedbackBar()
      .find("#feedbackYes")
      .at(0)
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Page Feedback (feedback-prompt)",
      "Yes"
    );
  });
});

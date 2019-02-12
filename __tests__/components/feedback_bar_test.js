import React from "react";
import { FeedbackBar } from "../../components/feedbackBar";
import { mount } from "enzyme";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

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
  it("passes axe tests", async () => {
    let html = mountedFeedbackBar().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows the feedback prompt", () => {
    expect(mountedFeedbackBar().text()).toContain("feedback-prompt");
  });

  describe("clicking the comment submit button", () => {
    it("calls the sendComment function", () => {
      const spy = jest.spyOn(mountedFeedbackBar().instance(), "sendComment");
      mountedFeedbackBar()
        .find("#feedbackNo")
        .at(0)
        .simulate("click");

      mountedFeedbackBar()
        .find("#sendComment")
        .at(0)
        .simulate("click");

      expect(spy).toBeCalled();
    });
  });

  it("editing the what were you doing text area updates the bug state", () => {
    mountedFeedbackBar()
      .find("#feedbackBug")
      .at(0)
      .simulate("click");

    mountedFeedbackBar()
      .find("#commentTextArea")
      .at(0)
      .props()
      .onChange({ target: { value: "bar" } });
    expect(mountedFeedbackBar().state().bug).toEqual("bar");
  });

  it("editing the how can info be more useful text area updates the infoBeMoreUseful state", () => {
    mountedFeedbackBar()
      .find("#feedbackNo")
      .at(0)
      .simulate("click");

    mountedFeedbackBar()
      .find("#commentTextArea")
      .at(0)
      .props()
      .onChange({ target: { value: "bar" } });
    expect(mountedFeedbackBar().state().infoBeMoreUseful).toEqual("bar");
  });

  describe("clicking the comment cancel button", () => {
    it("changes the toggle state", () => {
      mountedFeedbackBar()
        .find("#feedbackNo")
        .at(0)
        .simulate("click");

      mountedFeedbackBar()
        .find("#cancelComment")
        .at(0)
        .simulate("click");

      expect(mountedFeedbackBar().state().commentFormToggled).toEqual(false);
    });
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
    it("does not show the thank you for your feedback text", () => {
      mountedFeedbackBar()
        .find("#feedbackNo")
        .at(0)
        .simulate("click");
      expect(mountedFeedbackBar().text()).not.toContain("feedback-response");
    });

    it("shows the commentBox", () => {
      mountedFeedbackBar()
        .find("#feedbackNo")
        .at(0)
        .simulate("click");
      expect(mountedFeedbackBar().text()).toContain("comment-help-us-improve");
    });

    it("shows the thank you for your feedback text after clicking submit button", () => {
      mountedFeedbackBar()
        .find("#feedbackNo")
        .at(0)
        .simulate("click");

      mountedFeedbackBar()
        .find("#sendComment")
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

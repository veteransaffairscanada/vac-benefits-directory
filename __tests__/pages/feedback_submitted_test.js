import React from "react";
import { mount } from "enzyme";
import { FeedbackSubmitted } from "../../pages/feedback_submitted";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
import translate from "../fixtures/translate";

jest.mock("react-ga");

describe("FeedbackSubmitted", () => {
  let props;

  beforeEach(() => {
    props = {
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: translate
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<FeedbackSubmitted {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains a back button", async () => {
    expect(mount(<FeedbackSubmitted {...props} />).text()).toContain("back");
  });
  it("contains the Return to Find benefits and services link", async () => {
    expect(mount(<FeedbackSubmitted {...props} />).text()).toContain(
      "ben_dir_link"
    );
  });
});
